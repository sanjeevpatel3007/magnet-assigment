import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, CheckSquare, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarItem = ({ icon: Icon, label, path, active }) => {
    return (
        <Link
            to={path}
            className={`flex items-center gap-4 px-6 py-4 mx-4 rounded-xl transition-all duration-300 group
        ${active
                    ? 'bg-[var(--color-accent-orange)] text-[#13141f] shadow-lg shadow-orange-500/20 font-semibold'
                    : 'text-[var(--color-text-sidebar)] hover:bg-gray-100'
                }`}
        >
            <Icon className={`w-5 h-5 ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
            <span>{label}</span>
        </Link>
    );
};

const DashboardLayout = ({ children }) => {
    const { logout, user } = useAuth();
    const location = useLocation();

    return (
        <div className="flex h-screen bg-[var(--color-bg-main)] overflow-hidden font-['Outfit']">
            {/* Sidebar - White & Rounded */}
            <aside className="w-72 bg-white h-full rounded-r-[40px] flex flex-col z-20 shadow-2xl relative">
                <div className="p-8 flex items-center gap-3">
                    <div className="bg-[var(--color-accent-orange)] p-2 rounded-lg">
                        <CheckSquare className="text-[#13141f] w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#13141f]">Managy.</h1>
                </div>

                <nav className="flex-1 flex flex-col gap-2 mt-4">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        path="/"
                        active={location.pathname === '/'}
                    />
                    <SidebarItem
                        icon={CheckSquare}
                        label="My Tasks"
                        path="/tasks"
                        active={location.pathname === '/tasks'}
                    />
                </nav>

                <div className="p-6">
                    <div className="bg-[#13141f] rounded-3xl p-6 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--color-accent-purple)] blur-[40px] opacity-50"></div>
                        <div className="relative z-10">
                            <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl">👑</span>
                            </div>
                            <h3 className="font-bold mb-1">Go Pro</h3>
                            <p className="text-xs text-gray-400 mb-4 px-2">Get more features with Pro Plan</p>
                            <button className="bg-white text-[#13141f] text-xs font-bold py-2 px-4 rounded-full w-full hover:bg-gray-100 transition-colors">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-4 px-10 py-6 text-red-500 hover:bg-red-50 transition-colors font-medium rounded-br-[40px]"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Topbar */}
                <header className="h-24 flex items-center justify-between px-10 shrink-0">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        {location.pathname === '/' ? 'Dashboard' :
                            location.pathname.startsWith('/task/') ? 'Task Details' :
                                location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2)}
                    </h2>

                    <div className="flex items-center gap-6">
                        <button className="bg-[#1e202e] p-3 rounded-full text-white hover:bg-[#2a2d40] transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e202e]"></span>
                        </button>

                        <div className="flex items-center gap-4 bg-[#1e202e] pl-4 pr-2 py-2 rounded-full border border-gray-800">
                            <div className="text-right hidden md:block">
                                <p className="text-white text-sm font-semibold">{user?.username || 'Guest'}</p>
                                <p className="text-xs text-gray-400 capitalize">{user?.role || 'Viewer'}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-tr from-[var(--color-accent-purple)] to-[var(--color-accent-orange)] rounded-full flex items-center justify-center text-white font-bold border-2 border-[#13141f]">
                                {user?.username?.charAt(0).toUpperCase() || <User size={18} />}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
                    {children}
                </div>
            </main>

            {/* Right Utility Panel (Simulated from design) - Optional implementation for now, kept minimal */}
            {/* Could be part of the Dashboard page specific layout */}
        </div>
    );
};

export default DashboardLayout;
