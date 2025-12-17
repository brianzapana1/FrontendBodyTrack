import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: typeof window !== 'undefined' && localStorage.getItem('bodytrack-theme') || 'dark',
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark'
    
    // Save to localStorage
    localStorage.setItem('bodytrack-theme', newTheme)
    
    // Update document class for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    return { theme: newTheme }
  }),
  
  setTheme: (theme) => set(() => {
    // Save to localStorage
    localStorage.setItem('bodytrack-theme', theme)
    
    // Update document class for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    return { theme }
  }),
  
  // Initialize theme on app load
  initializeTheme: () => {
    const storedTheme = localStorage.getItem('bodytrack-theme') || 'dark'
    
    // Apply theme to document
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    return storedTheme
  }
}))
