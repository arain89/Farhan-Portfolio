# Farhan — Professional Web Developer Portfolio

A modern, responsive, animated single-page portfolio website designed for **Farhan**, a Full-Stack Web Developer. Built with HTML5, modern CSS3 (Glassmorphism, Dark/Light mode theme switching, animations), and JavaScript ES6+.

## 🌟 Key Features

- **Dark & Light Mode Switcher**: Seamless theme switching with state saved in browser `localStorage`.
- **Hero Typing Animation**: Dynamic auto-typing text showcasing core development skills.
- **Scroll Reveal Animations**: Smooth section entry animations powered by native `IntersectionObserver`.
- **Animated Counter Stats**: Dynamic numerical counters for projects completed, experience years, and satisfied clients.
- **Categorized Tech Stack**: Detailed proficiency bars and skill badges for Frontend, Backend, and Developer Tools.
- **Filterable Portfolio Grid**: Interactive category filters (Full-Stack, Frontend, Web Apps) with smooth card transitions.
- **Interactive Project Modal**: Deep-dive popup window presenting tech stack breakdown, feature lists, and source code links.
- **Career Timeline**: Vertical animated milestone roadmap detailing professional roles and experience.
- **Interactive Contact Form**: Client-side validated contact form with custom submitting state and toast notification popup.
- **Fully Responsive**: Mobile-first responsive design for desktops, laptops, tablets, and smartphones.

---

## 📁 File Structure

```text
portfolio/
├── index.html       # Main HTML5 document structure with semantic tags
├── styles.css       # Custom CSS styling, theme variables, glassmorphism & keyframes
├── script.js        # Interactive JS (Theme toggle, typing effect, modals, filters)
└── README.md        # Project documentation & guidelines
```

---

## 🚀 How to Open & Run

1. Simply double-click `index.html` or open it in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Alternatively, if using VS Code, use the **Live Server** extension to launch local web server at `http://127.0.0.1:5500`.

---

## ✏️ How to Customize for Farhan

### 1. Update Contact Information
In `index.html` (under `<section id="contact">`), update:
- Email address: `farhan.developer@example.com`
- Social links: GitHub, LinkedIn, Twitter/X profile URIs.

### 2. Add or Edit Projects
In `script.js` (under `projectData` object), add or modify project entries:
```javascript
const projectData = {
    '1': {
        title: 'Your Project Name',
        category: 'Full-Stack Platform',
        description: 'Detailed description of your project...',
        tech: ['React', 'Node.js', 'MongoDB'],
        features: ['Feature 1', 'Feature 2']
    }
}
```

### 3. Customize Typing Roles
In `script.js` (under `roles` array), modify the rotating text strings:
```javascript
const roles = [
    'Full-Stack Web Developer',
    'Frontend UI/UX Specialist',
    'React & Node.js Engineer',
    'Creative Web Innovator'
];
```

---

## 🛠️ Built With

- **HTML5** (Semantic elements & accessibility)
- **CSS3** (Variables, Flexbox, CSS Grid, Glassmorphism, Keyframes)
- **JavaScript (ES6+)** (Vanilla JS with no bulky dependencies)
- **FontAwesome 6.5** (Vector icons)
- **Google Fonts** (Inter & JetBrains Mono)
