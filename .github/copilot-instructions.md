# Nexus Web - AI Coding Agent Instructions

## Project Overview
Nexus is a static AI/tech news website built with vanilla HTML, CSS, and JavaScript. It features a modern dark theme with purple accents, smooth animations, and responsive design. The site focuses on AI topics with Portuguese language content.

## Architecture
- **index.html**: Main landing page with hero video, scrolling topic tags, news grid, and footer
- **article.html**: Article template with pixel-art hero section and content layout
- **script.js**: Handles animations (infinite scroll, fade-in, text reveal) using Intersection Observer
- **style.css**: Comprehensive styling with CSS variables, custom fonts (Orbitron/Arvo), and responsive breakpoints
- **assets/**: Static media files (videos, SVGs)

## Key Patterns & Conventions

### Styling
- Use CSS variables from `:root` for colors: `--bg-color`, `--text-main`, `--purple-dark`, `--purple-light`, `--card-bg`
- Fonts: `--font-highlight` (Orbitron) for headings, `--font-text` (Arvo) for body
- Border radius: `--card-radius` (16px) for consistent rounded corners
- Dark theme with subtle borders: `rgba(255,255,255,0.05)` for depth
- Hover effects: Purple glows and transforms for interactive elements

### Animations
- Fade-in on scroll: Add `hidden` class, JS adds `show` via IntersectionObserver
- Infinite scroll: `.scroller` with `data-animated="true"`, duplicates content for seamless loop
- Text reveal: Split text into spans, activate progressively based on scroll progress
- Pauses on hover for accessibility (prefers-reduced-motion check)

### Layout
- Bento grid for news cards: 2x2 responsive grid
- Sticky text reveal in tall containers (300vh) for dramatic effect
- Centered content with max-width containers
- Mobile-first responsive design with single-column fallbacks

### JavaScript
- DOMContentLoaded wrapper for initialization
- QuerySelectorAll for multiple elements (scrollers, hidden elements)
- Event listeners for scroll/resize on text reveal
- Clone nodes for infinite scroll duplication

### Content Structure
- Portuguese text throughout (lang="pt")
- Topic tags: AI-related terms in scrolling lists
- News cards with Unsplash images, tags, and overlays
- Footer with standard links

## Development Workflow
1. Edit HTML structure in index.html or article.html
2. Style in style.css using established variables and patterns
3. Add JS logic in script.js for new animations
4. Test responsiveness and animations in browser
5. Add assets to assets/ folder

## Adding New Sections
- Wrap in `<section class="hidden">` for fade-in animation
- Use grid layouts for card-based content
- Follow color scheme: dark backgrounds, purple accents
- Include hover states with transforms and glows

## Examples
- News card: `.card` with `.overlay`, `.card-tags`, `.card-content`
- Scrolling tags: `.scroller > .tag-list > .tag`
- Hero text: Position absolute with gradient overlay

## File References
- [style.css](style.css) - Complete styling system
- [script.js](script.js) - Animation implementations
- [index.html](index.html) - Main page structure</content>
<parameter name="filePath">c:\Users\Asus\Desktop\NEXUS-WEB\.github\copilot-instructions.md