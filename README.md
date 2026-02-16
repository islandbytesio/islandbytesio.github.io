# IslandBytes Website

A professional, modern multi-page website for IslandBytes - combining technical excellence with a sophisticated island aesthetic.

## 🌴 Pages

### Landing Page (`index.html`)
- Tech-focused design with dynamic animations
- Floating code elements and grid overlay
- Animated statistics counter
- Terminal-style command showcase with typing effect
- Feature cards highlighting key benefits
- Dark theme with teal and coral accents

### Support Page (`support.html`)
- Clean, accessible contact page
- Email support with beautiful graphics
- Response time and availability information
- Light island theme with subtle animations
- Perfect for Chrome extension support pages

## ✨ Features

**Design & Aesthetics:**
- Modern, professional navigation bar
- Sophisticated island theme with animated palm leaves
- Gradient orbs and floating code elements
- **Teal (#14b8a6) and pale coral (#ffd4cc)** color scheme
- Dark theme for landing, light theme for support page
- Glassmorphism effects with backdrop blur

**Advanced Interactions:**
- Parallax effects responding to mouse movement
- Smooth hover animations on all interactive elements
- Animated terminal with auto-typing commands
- Counter animation for statistics
- Touch-optimized for mobile devices
- Easter egg: Click any logo 5 times for a fun animation!

**Technical Excellence:**
- Performance-optimized animations using transform and opacity
- Responsive design (desktop, tablet, mobile)
- Accessibility features (reduced motion support)
- SEO-friendly semantic HTML
- Cross-browser compatible
- Fallback SVG logos if images fail to load

## 🎨 Color Palette

- **Teal Primary**: `#14b8a6` (Main brand color)
- **Teal Light**: `#2dd4bf` (Accents and highlights)
- **Teal Dark**: `#0f766e` (Darker accents)
- **Pale Coral**: `#ffd4cc` (Accent color)
- **Coral Light**: `#ffe8e3` (Light backgrounds)
- **Dark Background**: `#0a0e1a` to `#1a1f35` (Landing page)

## 📁 File Structure

```
islandbytes_web/
├── index.html          # Main landing page (tech-focused)
├── support.html        # Support/contact page
├── styles.css          # Unified styles for both pages
├── landing.js          # Interactive JavaScript for landing page
├── script.js           # Interactive JavaScript for support page
├── logo.png            # Your logo (to be added)
└── README.md           # This file
```

## 🚀 Setup

1. **Add your logo:**
   - Place your logo image as `logo.png` in the project directory
   - Recommended size: 400x160px (or similar 2.5:1 aspect ratio)
   - If the logo doesn't load, a fallback SVG will appear automatically

2. **Update email address:**
   - Open `support.html`
   - Find and replace `support@islandbytes.com` with your email

3. **Open the website:**
   - Simply open `index.html` in your browser for the landing page
   - Navigate to support page via the navigation menu

## 🛠️ Customization

### Email Address
Update in `support.html`:
```html
<a href="mailto:your-email@domain.com" class="email-link">
    <span class="email-text">your-email@domain.com</span>
    ...
</a>
```

### Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --teal: #14b8a6;
    --coral: #ffd4cc;
    /* ... other colors */
}
```

### Statistics
Update values in `index.html`:
```html
<div class="stat-value" data-target="99.9">0</div>
```

### Terminal Commands
Modify the commands array in `landing.js`:
```javascript
const commands = [
    { 
        cmd: 'your command here',
        output: 'output text',
        delay: 1000
    },
    // ... more commands
];
```

## 🌐 Browser Support

- Chrome (latest) ✓
- Firefox (latest) ✓
- Safari (latest) ✓
- Edge (latest) ✓
- Mobile browsers (iOS Safari, Chrome Mobile) ✓

## ⚡ Performance

- Optimized animations using CSS transforms
- Throttled parallax effects for smooth performance
- Reduced animations on low-end devices
- Lazy loading and efficient rendering
- RequestAnimationFrame for smooth 60fps animations

## 📱 Responsive Design

- **Desktop**: Full experience with all animations
- **Tablet**: Optimized layout and touch interactions
- **Mobile**: Simplified animations, touch-optimized interface

## 🎯 Use Cases

Perfect for:
- Technical business branding
- Chrome extension support pages
- Product landing pages
- SaaS company websites
- Developer tool marketing

## 🔧 Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Custom properties, Grid, Flexbox, Advanced animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Space Grotesk, JetBrains Mono)

## 📄 License

© 2026 IslandBytes. All rights reserved.

---

**Note**: This website features a professional tech aesthetic with subtle island theming. The landing page emphasizes movement and interactivity, while the support page provides a clean, accessible contact experience.
