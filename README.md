# IslandBytes Website

A professional, modern landing page for IslandBytes - combining technical excellence with a sophisticated island aesthetic.

## Features

- **Modern Design**: Clean, professional layout with advanced animations
- **Island Theme**: Subtle palm leaf decorations and tropical color palette
- **Responsive**: Fully responsive design that works on all devices
- **Animated**: Smooth parallax effects, gradient animations, and interactive elements
- **Accessible**: WCAG compliant with reduced motion support
- **Performance**: Optimized for fast loading and smooth animations

## Color Palette

- **Teal**: `#14b8a6` (Primary brand color)
- **Pale Coral**: `#ffd4cc` (Accent color)
- **Gradients**: Smooth transitions between teal and coral

## Technologies Used

- HTML5
- CSS3 (Custom properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Space Grotesk)

## Setup

1. Place your logo image as `logo.png` in the root directory
2. Update the email address in `index.html` (currently set to `support@islandbytes.com`)
3. Open `index.html` in a modern web browser

## File Structure

```
islandbytes_web/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive JavaScript
├── logo.png            # Your logo (to be added)
└── README.md           # This file
```

## Customization

### Email Address
Update the email in `index.html`:
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

### Logo
Replace `logo.png` with your own logo image. Recommended size: 400x160px or similar aspect ratio.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized animations using `transform` and `opacity`
- Throttled parallax effects for smooth performance
- Reduced animations on low-end devices
- Lazy loading and efficient rendering

## License

© 2026 IslandBytes. All rights reserved.

