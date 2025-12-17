# Theme System - BodyTrack

## Overview
BodyTrack now supports both **Dark Mode** (default) and **Light Mode** with seamless theme switching.

## Features
- 🌙 Dark Mode (default)
- ☀️ Light Mode
- 💾 Theme preference persists in localStorage
- ⚡ Instant theme switching
- 🎨 All components support both themes

## How to Use

### Toggle Theme
Users can switch between themes using the theme toggle button in the navbar dropdown menu:
1. Click on your avatar in the top right
2. Click the sun (☀️) or moon (🌙) icon
3. Theme switches instantly and preference is saved

### Theme Store
The theme is managed by Zustand store located at `src/store/themeStore.js`

```javascript
import { useThemeStore } from './store/themeStore'

const { theme, toggleTheme, setTheme } = useThemeStore()

// Current theme: 'dark' or 'light'
console.log(theme)

// Toggle between themes
toggleTheme()

// Set specific theme
setTheme('light')
```

## Implementation Details

### Tailwind Configuration
- Uses `darkMode: 'class'` strategy
- Dark mode activated when `<html>` has `dark` class
- All colors have light and dark variants

### Color System

#### Light Theme Colors
```css
--light-bg: #FAFAFA
--light-card: #FFFFFF
--light-surface: #F5F5F5
--light-border: #E5E5E5
```

#### Dark Theme Colors
```css
--dark-bg: #050505
--dark-card: #121212
--dark-surface: #1E1E1E
--dark-border: #27272A
```

#### Text Colors
- Light Mode: `text-primary-light`, `text-secondary-light`, `text-muted-light`
- Dark Mode: `text-primary`, `text-secondary`, `text-muted`

### Component Usage
Components automatically adapt to theme using Tailwind's `dark:` prefix:

```jsx
<div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
  <h1 className="text-text-primary-light dark:text-text-primary">Hello</h1>
</div>
```

### Preview Files
- **Dark Mode**: `/design-preview.html`
- **Light Mode**: `/design-preview-light.html`

Open these files in a browser to preview the full design system in each theme.

## Adding Theme Support to New Components

1. Use theme-aware Tailwind classes:
```jsx
// Background
className="bg-light-card dark:bg-dark-card"

// Text
className="text-text-primary-light dark:text-text-primary"

// Border
className="border-light-border dark:border-dark-border"

// Surface (for nested elements)
className="bg-light-surface dark:bg-dark-surface"
```

2. Use existing CSS utility classes (they already support both themes):
```jsx
className="card" // Automatically theme-aware
className="btn-primary" // Works in both themes
className="input" // Adapts to theme
```

## Status Colors
Both themes have status colors:
- **Error**: Light `#DC2626` / Dark `#FF1744`
- **Success**: Light `#00C853` / Dark `#00E676`
- **Warning**: Light `#F59E0B` / Dark `#FFAB00`

## Future Enhancements
- [ ] System preference detection (auto-switch based on OS theme)
- [ ] Custom theme colors
- [ ] High contrast mode
- [ ] Scheduled theme switching (e.g., dark at night)
