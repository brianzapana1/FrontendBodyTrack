import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Sidebar - Desktop only */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        <Navbar />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
