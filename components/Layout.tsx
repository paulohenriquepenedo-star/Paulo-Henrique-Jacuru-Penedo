
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  UsersIcon, 
  CalendarIcon, 
  UserCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20 md:pb-0 md:pl-64">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-emerald-900 text-white fixed h-full left-0 top-0 shadow-xl z-20">
        <div className="p-6 border-b border-emerald-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-7 h-7 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Corretor360</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem to="/" icon={<HomeIcon className="w-5 h-5" />} label="Dashboard" />
          <NavItem to="/properties" icon={<BuildingOfficeIcon className="w-5 h-5" />} label="Imóveis" />
          <NavItem to="/leads" icon={<UsersIcon className="w-5 h-5" />} label="Clientes" />
          <NavItem to="/agenda" icon={<CalendarIcon className="w-5 h-5" />} label="Agenda" />
          <NavItem to="/profile" icon={<UserCircleIcon className="w-5 h-5" />} label="Meu Perfil" />
        </nav>
      </aside>

      {/* Header Mobile */}
      <header className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-slate-800">{title}</h1>
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
          <SparklesIcon className="w-5 h-5 text-emerald-600" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
        <MobileNavItem to="/" icon={<HomeIcon className="w-6 h-6" />} label="Início" />
        <MobileNavItem to="/properties" icon={<BuildingOfficeIcon className="w-6 h-6" />} label="Imóveis" />
        <MobileNavItem to="/leads" icon={<UsersIcon className="w-6 h-6" />} label="Leads" />
        <MobileNavItem to="/agenda" icon={<CalendarIcon className="w-6 h-6" />} label="Agenda" />
        <MobileNavItem to="/profile" icon={<UserCircleIcon className="w-6 h-6" />} label="Perfil" />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive ? 'bg-emerald-700 text-white shadow-inner' : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

const MobileNavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex flex-col items-center gap-1 transition-colors px-4 py-1 rounded-md ${
        isActive ? 'text-emerald-600' : 'text-slate-400'
      }`
    }
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </NavLink>
);

export default Layout;
