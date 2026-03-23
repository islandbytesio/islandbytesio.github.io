# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static GitHub Pages site for **IslandBytes** (hosted via `CNAME`). No build step — files are served directly by GitHub Pages.

## Comprehension Gate

The repo enforces a comprehension gate on all PRs targeting `main` via three GitHub Actions workflows:

- **`comprehension-gate-push.yml`** — triggers on push to any non-`main` branch. Calls Claude (`claude-opus-4-6`) via `scripts/comprehension_gate.py` to generate 3 multiple-choice questions from the commit diff, posts them as a commit comment, and sets a `pending` commit status ("Comprehension Gate").
- **`comprehension-gate-pr.yml`** — triggers on PR open/sync/ready. Generates questions from the PR diff, posts them in a PR comment, and sets the commit status to `pending`. Uses upsert logic so re-pushing updates the existing comment rather than creating a new one.
- **`comprehension-check.yml`** — triggers on PR comments (`issue_comment`). Parses the PR author's reply for answer letters (formats: `1. A`, `1) A`, `Q1: A`, or bare `A B C`), checks them against the answer key stored in a base64-encoded hidden HTML comment, then sets the commit status to `success` or `failure` and posts a result comment.

**Important:** `comprehension-check.yml` uses an `issue_comment` trigger, which GitHub always reads from the **default branch (`main`)**. It will not run until merged to `main`.

### Answer key storage

The correct answers are embedded in the PR comment as a base64-encoded HTML comment:
```
<!-- comprehension-gate: <base64> -->
```
The check workflow decodes this with `Buffer.from(match[1].trim(), 'base64').toString()` — no database or extra API call needed.

### Required secret

`ANTHROPIC_API_KEY` must be set as a **repository secret** (Settings → Secrets and variables → Actions).

### Required branch protection

To enforce the gate, enable "Require status checks to pass before merging" on `main` and add **`Comprehension Gate`** as a required check.

### `scripts/comprehension_gate.py` modes

```
python scripts/comprehension_gate.py generate <diff_file>         # outputs questions JSON
python scripts/comprehension_gate.py check-answers <payload_file> # checks answers, no API call
python scripts/comprehension_gate.py parse-answers <comment_file> # extracts answer letters
```

`python-dotenv` is optional (used for local dev via `.env`); the script handles its absence gracefully.
