#!/usr/bin/env python3
"""
Comprehension Gate — Multiple choice version.

Modes:
    generate <diff_file>           Generate 3 MCQ questions from a diff file
    check-answers <payload_file>   Check answers against key — no API call
                                   payload: {questions, answers}
                                   answers: ["A", "C", "B"]
    parse-answers <comment_file>   Extract answer letters (A–D) from a comment

All modes output JSON to stdout.
"""

import anthropic
import json
import re
import sys
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


MAX_DIFF_CHARS = 12_000


def truncate_diff(diff: str) -> str:
    if len(diff) <= MAX_DIFF_CHARS:
        return diff
    truncated = diff[:MAX_DIFF_CHARS]
    last_newline = truncated.rfind("\n")
    if last_newline > MAX_DIFF_CHARS * 0.85:
        truncated = truncated[:last_newline]
    return (
        truncated
        + f"\n\n[...diff truncated: showing first {MAX_DIFF_CHARS:,} of {len(diff):,} characters...]"
    )


def extract_json(text: str) -> str:
    """Strip markdown code fences and return the first JSON object found."""
    text = text.strip()
    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fenced:
        return fenced.group(1)
    raw = re.search(r"\{.*\}", text, re.DOTALL)
    if raw:
        return raw.group(0)
    return text


def generate_questions(diff: str) -> list[dict]:
    """Call Claude to generate 3 multiple-choice comprehension questions."""
    client = anthropic.Anthropic()

    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=2048,
        system="You are a senior code reviewer generating multiple choice questions to verify developers understand their own code changes.",
        messages=[
            {
                "role": "user",
                "content": f"""Analyze this code diff and generate exactly 3 multiple choice questions.

Requirements:
- Each question tests understanding of the actual logic, design decisions, or edge cases in the changes
- Provide exactly 4 options (A, B, C, D) per question
- Exactly one option must be clearly correct; the other three should be plausible distractors that reflect common misunderstandings
- Questions must not be answerable without understanding the code — not just re-reading the diff

Return ONLY valid JSON — no markdown, no explanation:
{{
    "questions": [
        {{
            "id": 1,
            "question": "...",
            "choices": {{"A": "...", "B": "...", "C": "...", "D": "..."}},
            "correct": "B"
        }},
        {{
            "id": 2,
            "question": "...",
            "choices": {{"A": "...", "B": "...", "C": "...", "D": "..."}},
            "correct": "A"
        }},
        {{
            "id": 3,
            "question": "...",
            "choices": {{"A": "...", "B": "...", "C": "...", "D": "..."}},
            "correct": "D"
        }}
    ]
}}

Code diff:
```diff
{diff}
```""",
            }
        ],
    )

    text = extract_json(response.content[0].text)
    return json.loads(text)["questions"]


def check_answers(questions: list[dict], submitted: list[str]) -> dict:
    """
    Compare submitted answer letters against the stored correct answers.
    No API call — pure comparison.
    """
    results = []
    passed_count = 0

    for q, given in zip(questions, submitted):
        correct = q["correct"].upper()
        given = given.strip().upper()
        is_correct = given == correct
        if is_correct:
            passed_count += 1
        results.append({
            "id": q["id"],
            "given": given,
            "correct": correct,
            "passed": is_correct,
        })

    total = len(questions)
    passed = passed_count == total

    wrong_ids = [r["id"] for r in results if not r["passed"]]
    if passed:
        feedback = "All correct — comprehension gate passed."
    elif passed_count == 0:
        feedback = "All answers incorrect. Please re-read the changes and try again."
    else:
        qs = ", ".join(f"Q{i}" for i in wrong_ids)
        feedback = f"{qs} {'was' if len(wrong_ids) == 1 else 'were'} incorrect. Please review those parts of the diff."

    return {
        "passed": passed,
        "score": f"{passed_count}/{total}",
        "results": results,
        "feedback": feedback,
    }


def parse_answers_from_comment(comment_body: str) -> list[str] | None:
    """
    Extract 3 answer letters (A–D) from a comment. Accepts formats like:
        1. B  /  1) B  /  1: B  /  Q1: B  /  1 - B
    or a bare sequence of 3 letters: A C B
    """
    body = comment_body.strip()

    # Numbered format:  1. B  or  Q1 B  or  1) B
    numbered = re.findall(
        r"(?:Q\s*)?(\d+)[.):\-\s]+([A-Da-d])\b",
        body,
        re.IGNORECASE,
    )
    if len(numbered) >= 3:
        sorted_m = sorted(numbered[:3], key=lambda x: int(x[0]))
        return [m[1].upper() for m in sorted_m]

    # Fallback: any three standalone letters A–D in order
    letters = re.findall(r"\b([A-Da-d])\b", body)
    if len(letters) >= 3:
        return [l.upper() for l in letters[:3]]

    return None


def main():
    if len(sys.argv) < 3:
        print(
            "Usage: comprehension_gate.py [generate|check-answers|parse-answers] <file>",
            file=sys.stderr,
        )
        sys.exit(1)

    mode = sys.argv[1]
    filepath = Path(sys.argv[2])

    if not filepath.exists():
        print(f"File not found: {filepath}", file=sys.stderr)
        sys.exit(1)

    if mode == "generate":
        diff = filepath.read_text()
        if not diff.strip():
            print(json.dumps({"error": "Empty diff — nothing to generate questions for"}))
            sys.exit(1)
        questions = generate_questions(truncate_diff(diff))
        print(json.dumps({"questions": questions}, indent=2))

    elif mode == "check-answers":
        payload = json.loads(filepath.read_text())
        result = check_answers(payload["questions"], payload["answers"])
        print(json.dumps(result, indent=2))

    elif mode == "parse-answers":
        comment = filepath.read_text()
        answers = parse_answers_from_comment(comment)
        if answers:
            print(json.dumps({"found": True, "answers": answers}, indent=2))
        else:
            print(json.dumps({"found": False, "answers": []}))

    else:
        print(f"Unknown mode: {mode}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
