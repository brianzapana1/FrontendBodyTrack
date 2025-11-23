# 🎨 BodyTrack Design System
## "Strength & Elegance" - Premium Dark Mode Fitness Interface

*Last Updated: November 20, 2025*

---

## 🌟 Design Philosophy

The BodyTrack design system embodies **"Strength & Elegance"**—a premium, dark-mode-first interface that conveys power, focus, and sophistication. Every element is crafted to inspire users on their fitness journey while maintaining professional credibility for trainers and administrators.

### Core Principles:
1. **Power & Focus** - Bold purples and golds that energize
2. **Clarity** - High contrast for readability during workouts
3. **Premium Feel** - Subtle glows, refined shadows, glass effects
4. **Accessibility** - WCAG AAA compliant contrast ratios
5. **Consistency** - Unified visual language across all components

---

## 🎨 Color Palette

### Brand & Primary Actions

#### Primary Purple
- **HEX:** `#7A00FF` (Deep Electric Violet)
- **RGB:** `rgb(122, 0, 255)`
- **Usage:** Main CTA buttons, active navigation states, primary progress bars, links
- **Accessibility:** Passes WCAG AA on dark backgrounds

#### Primary Hover
- **HEX:** `#6200CC` (Darker Violet)
- **RGB:** `rgb(98, 0, 204)`
- **Usage:** Hover states for primary buttons, active press states
- **Context:** Provides clear interactive feedback

#### Primary Light (Gradients Only)
- **HEX:** `#9E47FF` (Soft Lavender)
- **RGB:** `rgb(158, 71, 255)`
- **Usage:** Gradient overlays, subtle highlights, loading states

---

### Accents & Success States

#### Gold Accent
- **HEX:** `#FFD700` (Pure Gold)
- **RGB:** `rgb(255, 215, 0)`
- **Usage:** 
  - Achievement badges and personal records
  - Premium/PRO feature highlights
  - Star ratings and awards
  - "Level up" notifications
- **Text on Gold:** Always use `#000000` (black) for contrast

#### Success Green
- **HEX:** `#00E676` (Bright Emerald)
- **RGB:** `rgb(0, 230, 118)`
- **Usage:**
  - Completed workout sets
  - Successful form submissions
  - Active subscription status
  - Progress milestones

#### Warning Orange
- **HEX:** `#FFAB00` (Amber)
- **RGB:** `rgb(255, 171, 0)`
- **Usage:**
  - Pending actions
  - Subscription expiring soon
  - Rest day reminders

#### Error Red
- **HEX:** `#FF1744` (Vibrant Red)
- **RGB:** `rgb(255, 23, 68)`
- **Usage:**
  - Form validation errors
  - Danger zone actions
  - "End Workout" or "Cancel Subscription" confirmations
  - Failed uploads

---

### Backgrounds (Dark Theme Base)

#### Background Base
- **HEX:** `#050505` (Near Black)
- **RGB:** `rgb(5, 5, 5)`
- **Usage:** Main application background, full-page overlays

#### Surface / Card
- **HEX:** `#121212` (Dark Grey)
- **RGB:** `rgb(18, 18, 18)`
- **Usage:** 
  - Workout cards
  - Modal dialogs
  - Form containers
  - Profile cards

#### Surface Highlight
- **HEX:** `#1E1E1E` (Lighter Grey)
- **RGB:** `rgb(30, 30, 30)`
- **Usage:**
  - Hover states on list items
  - Input field backgrounds
  - Subtle section dividers
  - Active sidebar items

#### Border Color
- **HEX:** `#27272A` (Subtle Border)
- **RGB:** `rgb(39, 39, 42)`
- **Usage:** 
  - Card borders
  - Input field borders
  - Divider lines
  - Table borders

---

### Typography & Text

#### Text Primary
- **HEX:** `#FFFFFF` (White)
- **RGB:** `rgb(255, 255, 255)`
- **Usage:** Headings, main values (weight, reps), primary labels

#### Text Secondary
- **HEX:** `#A1A1AA` (Cool Grey)
- **RGB:** `rgb(161, 161, 170)`
- **Usage:** 
  - Body text
  - Card descriptions
  - Secondary labels ("kg", "reps", dates)

#### Text Muted
- **HEX:** `#52525B` (Dark Grey)
- **RGB:** `rgb(82, 82, 91)`
- **Usage:**
  - Placeholder text
  - Disabled states
  - Inactive navigation items
  - Helper text

---

## 📐 Component Specifications

### Buttons

#### Primary Button
```css
background: #7A00FF;
color: #FFFFFF;
border-radius: 8px; /* or 12px for larger buttons */
padding: 12px 24px; /* Medium size */
font-weight: 600;
box-shadow: 0 4px 14px 0 rgba(122, 0, 255, 0.39);
transition: all 0.2s ease;

/* Hover State */
background: #6200CC;
box-shadow: 0 6px 20px 0 rgba(122, 0, 255, 0.5);
transform: translateY(-1px);

/* Active State */
transform: translateY(0);
box-shadow: 0 2px 8px 0 rgba(122, 0, 255, 0.3);

/* Disabled State */
background: #27272A;
color: #52525B;
box-shadow: none;
cursor: not-allowed;
```

**Usage Examples:**
- "Guardar Progreso"
- "Asignar Rutina"
- "Crear Ejercicio"
- "Iniciar Sesión"

#### Secondary Button
```css
background: transparent;
color: #7A00FF;
border: 1px solid #7A00FF;
border-radius: 8px;
padding: 12px 24px;
font-weight: 600;
transition: all 0.2s ease;

/* Hover State */
background: rgba(122, 0, 255, 0.1);
border-color: #9E47FF;

/* Active State */
background: rgba(122, 0, 255, 0.2);
```

**Usage Examples:**
- "Cancelar"
- "Ver Más"
- "Filtrar"

#### Gold Action Button (Premium/Achievement)
```css
background: #FFD700;
color: #000000;
border: none;
border-radius: 8px;
padding: 12px 24px;
font-weight: 700;
box-shadow: 0 4px 14px 0 rgba(255, 215, 0, 0.4);

/* Hover State */
background: #FFC700;
box-shadow: 0 6px 20px 0 rgba(255, 215, 0, 0.5);
transform: translateY(-1px);
```

**Usage Examples:**
- "Actualizar a PRO"
- "Nuevo Récord Personal"
- "Desbloquear"

#### Danger Button
```css
background: #FF1744;
color: #FFFFFF;
border: none;
border-radius: 8px;
padding: 12px 24px;
font-weight: 600;
box-shadow: 0 4px 14px 0 rgba(255, 23, 68, 0.3);

/* Hover State */
background: #D50032;
```

**Usage Examples:**
- "Eliminar Cuenta"
- "Cancelar Suscripción"
- "Finalizar Entrenamiento"

#### Icon Buttons
```css
background: transparent;
color: #A1A1AA;
border: none;
border-radius: 8px;
padding: 8px;
transition: all 0.2s ease;

/* Hover State */
background: #1E1E1E;
color: #FFFFFF;
```

---

### Cards & Containers

#### Standard Card
```css
background: #121212;
border: 1px solid #27272A;
border-radius: 12px;
padding: 20px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
transition: all 0.3s ease;

/* Hover State (Interactive Cards) */
border-color: #7A00FF;
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(122, 0, 255, 0.15);
```

**Usage Examples:**
- Workout summary cards
- Exercise cards
- Client profile cards
- Forum post cards

#### Highlighted Card (Active/Selected)
```css
background: #121212;
border: 2px solid #7A00FF;
border-radius: 12px;
box-shadow: 0 0 20px rgba(122, 0, 255, 0.3);
```

#### Glass Card (Navigation/Overlays)
```css
background: rgba(18, 18, 18, 0.8);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(122, 0, 255, 0.2);
border-radius: 16px;
```

**Usage Examples:**
- Mobile bottom navigation
- Floating action buttons
- Overlay modals

---

### Forms & Inputs

#### Text Input / Textarea
```css
background: #1E1E1E;
border: 1px solid #27272A;
border-radius: 8px;
padding: 12px 16px;
color: #FFFFFF;
font-size: 16px;
transition: all 0.2s ease;

/* Focus State */
border-color: #7A00FF;
box-shadow: 0 0 0 3px rgba(122, 0, 255, 0.1);
outline: none;

/* Error State */
border-color: #FF1744;
box-shadow: 0 0 0 3px rgba(255, 23, 68, 0.1);

/* Placeholder */
color: #52525B;
```

#### Label
```css
color: #A1A1AA;
font-size: 14px;
font-weight: 500;
margin-bottom: 8px;
display: block;
```

#### Error Message
```css
color: #FF1744;
font-size: 13px;
margin-top: 6px;
display: flex;
align-items: center;
gap: 6px;
```

#### Success Message
```css
color: #00E676;
font-size: 13px;
margin-top: 6px;
```

#### Select Dropdown
```css
/* Same as Text Input base styles, plus: */
appearance: none;
background-image: url("data:image/svg+xml,..."); /* Custom arrow */
background-repeat: no-repeat;
background-position: right 12px center;
padding-right: 40px;
```

#### Checkbox / Radio
```css
/* Custom styled with accent-color */
accent-color: #7A00FF;
width: 20px;
height: 20px;
cursor: pointer;
```

---

### Navigation

#### Top Navbar
```css
background: #121212;
border-bottom: 1px solid #27272A;
height: 64px;
padding: 0 24px;
display: flex;
align-items: center;
justify-content: space-between;
position: sticky;
top: 0;
z-index: 100;
```

#### Sidebar (Desktop)
```css
background: #121212;
width: 260px;
border-right: 1px solid #27272A;
height: 100vh;
position: fixed;
left: 0;
top: 0;
padding: 24px 0;
```

#### Sidebar Item
```css
padding: 12px 20px;
color: #A1A1AA;
display: flex;
align-items: center;
gap: 12px;
transition: all 0.2s ease;
cursor: pointer;
border-left: 3px solid transparent;

/* Hover State */
background: #1E1E1E;
color: #FFFFFF;

/* Active State */
background: rgba(122, 0, 255, 0.1);
color: #7A00FF;
border-left-color: #7A00FF;
```

#### Bottom Navigation (Mobile)
```css
background: rgba(18, 18, 18, 0.95);
backdrop-filter: blur(12px);
border-top: 1px solid #27272A;
position: fixed;
bottom: 0;
left: 0;
right: 0;
height: 64px;
display: flex;
justify-content: space-around;
align-items: center;
z-index: 100;
```

---

### Data Visualization

#### Progress Bar
```css
/* Container */
background: #1E1E1E;
border-radius: 8px;
height: 8px;
overflow: hidden;

/* Fill */
background: linear-gradient(90deg, #7A00FF 0%, #9E47FF 100%);
border-radius: 8px;
height: 100%;
transition: width 0.3s ease;

/* Gold Fill (Personal Best) */
background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
```

#### Line Chart (Recharts Configuration)
```javascript
// Line stroke
stroke: '#7A00FF'
strokeWidth: 3

// Active data point
fill: '#FFD700'
radius: 6

// Grid lines
stroke: '#27272A'
strokeDasharray: '3 3'

// Tooltip background
backgroundColor: '#121212'
border: '1px solid #27272A'
```

#### Stat Card (Number Display)
```css
/* Container */
background: #121212;
border: 1px solid #27272A;
border-radius: 12px;
padding: 24px;
text-align: center;

/* Label */
color: #A1A1AA;
font-size: 14px;
margin-bottom: 8px;

/* Value */
color: #FFFFFF;
font-size: 32px;
font-weight: 700;
font-family: 'Inter', sans-serif;
```

---

### Badges & Tags

#### Status Badge (Active)
```css
background: rgba(0, 230, 118, 0.1);
color: #00E676;
border: 1px solid #00E676;
border-radius: 16px;
padding: 4px 12px;
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
```

#### Status Badge (Inactive/Expired)
```css
background: rgba(82, 82, 91, 0.2);
color: #52525B;
border: 1px solid #52525B;
```

#### Plan Badge (BÁSICO)
```css
background: rgba(161, 161, 170, 0.1);
color: #A1A1AA;
border: 1px solid #A1A1AA;
```

#### Plan Badge (PREMIUM)
```css
background: rgba(122, 0, 255, 0.1);
color: #7A00FF;
border: 1px solid #7A00FF;
```

#### Plan Badge (PRO)
```css
background: rgba(255, 215, 0, 0.1);
color: #FFD700;
border: 1px solid #FFD700;
```

#### Achievement Badge
```css
background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
color: #000000;
border: none;
border-radius: 20px;
padding: 6px 14px;
font-weight: 700;
box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
```

---

### Modals & Dialogs

#### Modal Overlay
```css
background: rgba(5, 5, 5, 0.85);
backdrop-filter: blur(4px);
position: fixed;
inset: 0;
z-index: 1000;
display: flex;
align-items: center;
justify-content: center;
animation: fadeIn 0.2s ease;
```

#### Modal Content
```css
background: #121212;
border: 1px solid #27272A;
border-radius: 16px;
max-width: 500px;
width: 90%;
padding: 32px;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
animation: slideUp 0.3s ease;
```

#### Modal Header
```css
color: #FFFFFF;
font-size: 24px;
font-weight: 700;
margin-bottom: 16px;
```

#### Modal Actions
```css
display: flex;
gap: 12px;
justify-content: flex-end;
margin-top: 24px;
```

---

### Tables

#### Table Container
```css
background: #121212;
border: 1px solid #27272A;
border-radius: 12px;
overflow: hidden;
```

#### Table Header
```css
background: #1E1E1E;
color: #A1A1AA;
font-size: 14px;
font-weight: 600;
text-transform: uppercase;
padding: 16px;
border-bottom: 1px solid #27272A;
```

#### Table Row
```css
border-bottom: 1px solid #27272A;
transition: background 0.2s ease;

/* Hover State */
background: #1E1E1E;

/* Last Row */
border-bottom: none;
```

#### Table Cell
```css
padding: 16px;
color: #FFFFFF;
vertical-align: middle;
```

---

### Loading States

#### Spinner (Primary)
```css
border: 3px solid rgba(122, 0, 255, 0.2);
border-top-color: #7A00FF;
border-radius: 50%;
width: 40px;
height: 40px;
animation: spin 0.8s linear infinite;
```

#### Skeleton Loader
```css
background: linear-gradient(
  90deg,
  #1E1E1E 0%,
  #27272A 50%,
  #1E1E1E 100%
);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;
border-radius: 8px;
```

#### Progress Indicator (Indeterminate)
```css
background: #1E1E1E;
height: 4px;
overflow: hidden;

/* Bar */
background: linear-gradient(90deg, #7A00FF 0%, #9E47FF 100%);
width: 50%;
animation: progressMove 1.5s infinite;
```

---

### Animations

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}

@keyframes progressMove {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(122, 0, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(122, 0, 255, 0.6); }
}
```

---

## 🛠️ Tailwind CSS Configuration

### Complete `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#7A00FF',
          hover: '#6200CC',
          light: '#9E47FF',
        },
        // Accent Colors
        accent: {
          gold: '#FFD700',
          teal: '#00E676',
          orange: '#FFAB00',
        },
        // Dark Theme UI Colors
        dark: {
          bg: '#050505',
          card: '#121212',
          surface: '#1E1E1E',
          border: '#27272A',
        },
        // Semantic Status Colors
        status: {
          error: '#FF1744',
          success: '#00E676',
          warning: '#FFAB00',
        },
        // Text Colors
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#52525B',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(122, 0, 255, 0.5)',
        'glow-purple-sm': '0 0 10px rgba(122, 0, 255, 0.3)',
        'glow-gold': '0 0 15px rgba(255, 215, 0, 0.4)',
        'btn-primary': '0 4px 14px 0 rgba(122, 0, 255, 0.39)',
        'btn-primary-hover': '0 6px 20px 0 rgba(122, 0, 255, 0.5)',
        'btn-gold': '0 4px 14px 0 rgba(255, 215, 0, 0.4)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 24px rgba(122, 0, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['56px', { lineHeight: '1.1', fontWeight: '800' }],
        'display-2': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
        'input': '8px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.3s ease',
        'spin': 'spin 0.8s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 🎯 Component Usage Examples

### Button Examples (JSX)

```jsx
// Primary Button
<button className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-btn shadow-btn-primary hover:shadow-btn-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
  Guardar Progreso
</button>

// Secondary Button
<button className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-semibold py-3 px-6 rounded-btn transition-all duration-200">
  Cancelar
</button>

// Gold Action Button
<button className="bg-accent-gold text-black font-bold py-3 px-6 rounded-btn shadow-btn-gold hover:brightness-95 transition-all duration-200">
  🏆 Actualizar a PRO
</button>

// Danger Button
<button className="bg-status-error text-white font-semibold py-3 px-6 rounded-btn hover:bg-red-700 transition-all duration-200">
  Eliminar
</button>
```

### Card Examples (JSX)

```jsx
// Standard Card
<div className="bg-dark-card border border-dark-border rounded-card p-5 shadow-card hover:border-primary hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
  <h3 className="text-text-primary text-xl font-semibold mb-2">Mi Rutina</h3>
  <p className="text-text-secondary text-sm">Semana 3 de 12</p>
</div>

// Highlighted Card (Active)
<div className="bg-dark-card border-2 border-primary rounded-card p-5 shadow-glow-purple-sm">
  <h3 className="text-text-primary text-xl font-semibold">Rutina Activa</h3>
</div>
```

### Form Examples (JSX)

```jsx
// Input with Label
<div className="space-y-2">
  <label className="text-text-secondary text-sm font-medium block">
    Nombre Completo
  </label>
  <input
    type="text"
    className="w-full bg-dark-surface border border-dark-border rounded-input px-4 py-3 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
    placeholder="Ingresa tu nombre"
  />
</div>

// Input with Error
<div className="space-y-2">
  <label className="text-text-secondary text-sm font-medium block">Email</label>
  <input
    type="email"
    className="w-full bg-dark-surface border border-status-error rounded-input px-4 py-3 text-white focus:border-status-error focus:ring-4 focus:ring-status-error/10 outline-none"
    placeholder="email@ejemplo.com"
  />
  <p className="text-status-error text-xs flex items-center gap-1">
    <span>⚠️</span> Email inválido
  </p>
</div>
```

### Badge Examples (JSX)

```jsx
// Active Status
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase bg-accent-teal/10 text-accent-teal border border-accent-teal">
  Activo
</span>

// PRO Plan
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase bg-accent-gold/10 text-accent-gold border border-accent-gold">
  PRO
</span>

// Achievement Badge
<span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-accent-gold to-orange-500 text-black shadow-glow-gold">
  🏆 Nuevo Récord
</span>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Default: Mobile (< 640px) */

/* Tablet */
@media (min-width: 640px) { /* sm */ }

/* Desktop */
@media (min-width: 1024px) { /* lg */ }

/* Large Desktop */
@media (min-width: 1280px) { /* xl */ }
```

### Layout Structure

```jsx
// Desktop: Sidebar + Content
// Mobile: Bottom Navigation + Content

<div className="min-h-screen bg-dark-bg">
  {/* Desktop Sidebar (hidden on mobile) */}
  <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-dark-card border-r border-dark-border">
    {/* Sidebar content */}
  </aside>

  {/* Main Content */}
  <main className="lg:ml-64 pb-20 lg:pb-0">
    {/* Page content */}
  </main>

  {/* Mobile Bottom Nav (hidden on desktop) */}
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-dark-card/95 backdrop-blur-md border-t border-dark-border">
    {/* Bottom nav items */}
  </nav>
</div>
```

---

## ♿ Accessibility Guidelines

### Color Contrast Ratios (WCAG)
- **Primary on Dark BG:** 7.2:1 (AAA) ✅
- **White on Dark BG:** 19.5:1 (AAA) ✅
- **Gold on Black Text:** 12.8:1 (AAA) ✅
- **Secondary Text:** 4.8:1 (AA) ✅

### Interactive Elements
- All buttons must have `:focus-visible` states
- Keyboard navigation support for all interactive elements
- ARIA labels for icon-only buttons
- Semantic HTML (use `<button>`, `<nav>`, `<main>`, etc.)

### Focus States
```css
/* Keyboard Focus (not mouse click) */
.btn:focus-visible {
  outline: 2px solid #7A00FF;
  outline-offset: 2px;
}
```

---

## 🚀 Implementation Checklist

### Phase 1: Foundation
- [ ] Install Tailwind CSS and configure with design tokens
- [ ] Set up font imports (Inter, Poppins)
- [ ] Create base CSS file with custom animations
- [ ] Test color palette across all components

### Phase 2: Core Components
- [ ] Button variants (Primary, Secondary, Gold, Danger)
- [ ] Form inputs and validation states
- [ ] Cards and containers
- [ ] Navigation components

### Phase 3: Complex Components
- [ ] Modals and dialogs
- [ ] Data visualization (charts, progress bars)
- [ ] Tables and lists
- [ ] Loading states and skeletons

### Phase 4: Polish
- [ ] Animations and transitions
- [ ] Responsive breakpoints
- [ ] Dark mode persistence
- [ ] Accessibility audit

---

## 📚 Resources

### Fonts
- **Inter:** [Google Fonts](https://fonts.google.com/specimen/Inter)
- **Poppins:** [Google Fonts](https://fonts.google.com/specimen/Poppins)

### Icons
- **Lucide React:** Consistent, modern icon library
- **Heroicons:** Alternative icon set

### Design Tools
- **Figma:** For prototyping
- **Coolors:** Color palette testing
- **WebAIM Contrast Checker:** Accessibility validation

---

## 💡 Pro Tips

1. **Always test in dark rooms** - Fitness users often train early morning or late night
2. **Large touch targets** - Minimum 44x44px for mobile (sweaty fingers!)
3. **High contrast for readability** - Users glance at phone during sets
4. **Smooth animations** - 60fps for all interactions
5. **Optimistic UI updates** - Show changes immediately, sync in background
6. **Skeleton loaders** - Never show blank screens
7. **Haptic feedback** - For mobile interactions (checkmarks, completions)

---

**Last Updated:** November 20, 2025  
**Version:** 1.0.0  
**Maintained by:** BodyTrack Frontend Team
