# 💪 BodyTrack Frontend

Frontend application for BodyTrack - Smart Body Training Platform

## 🚀 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **React Router v6** - Navigation
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling with custom design system
- **React Hook Form + Zod** - Forms and validation
- **date-fns** - Date utilities
- **Recharts** - Data visualization

## 🎨 Design System

The app uses the **"Strength & Elegance"** design system:
- Dark-first theme (#050505 background)
- Purple primary (#7A00FF) with gold accents (#FFD700)
- Complete component library in Tailwind

See `../DESIGN_SYSTEM.md` for full documentation and preview at `../design-preview.html`

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs on `http://localhost:5173`

Backend API should be running on `http://localhost:4000`

## 🔐 Authentication

JWT-based authentication with:
- Token stored in localStorage
- Axios interceptor for automatic token injection
- Protected routes with role-based access (CLIENTE, ENTRENADOR, ADMIN)

## 📁 Project Structure

```
src/
├── api/              # API client + endpoints
├── components/       # React components (by module)
├── hooks/           # Custom hooks
├── pages/           # Page components
├── routes/          # Route protection
├── store/           # Zustand stores
└── utils/           # Utilities & constants
```

## ✅ Implemented Features

- [x] Authentication system (login/register)
- [x] Protected routes with role checks
- [x] Base layout (Navbar + Sidebar)
- [x] Dashboard page
- [x] Design system integrated
- [ ] Progress tracking (Phase 3)
- [ ] Exercise catalog (Phase 4)
- [ ] Routines management (Phase 5)

## 🎯 Styling Guide

```jsx
// Buttons
<button className="btn-primary">Save</button>
<button className="btn-secondary">Cancel</button>
<button className="btn-gold">Upgrade to PRO</button>

// Cards
<div className="card card-hover">Content</div>

// Inputs
<input className="input" placeholder="Email" />

// Text
<h1 className="text-heading-1">Title</h1>
<p className="text-text-secondary">Subtitle</p>
```

## 📖 Documentation

- Backend API: `../../BackendBodyTrack/README.md`
- Design System: `../DESIGN_SYSTEM.md`
- Frontend Roadmap: `../../BackendBodyTrack/FRONTEND_ROADMAP.md`
