import { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import api from '../utils/axiosInstance';
import StatCard from '../components/dashboard/StatCard';
import OverviewChart from '../components/dashboard/OverviewChart';
import TaskRow from '../components/dashboard/TaskRow';
import CreateTaskModal from '../components/dashboard/CreateTaskModal';
import { CheckSquare, Clock } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ completed: 0, total: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all'); // all, pending, completed

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks?limit=100'); // Get enough tasks for filtering
            setTasks(data.tasks);

            // Calculate Stats
            const completed = data.tasks.filter(t => t.status === 'completed').length;
            setStats({
                total: data.tasks.length,
                completed
            });
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
            // Optimistic Update
            setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));

            await api.put(`/tasks/${id}`, { status: newStatus });
            fetchTasks(); // Refresh for accurate stats
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'all') return true;
        return t.status === filter;
    });

    return (
        <div className="pb-8">
            {/* Header Actions */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
                    <p className="text-gray-400">Overview of your productivity</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[var(--color-accent-orange)] text-[#13141f] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
                >
                    <Plus size={20} /> New Task
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Tasks"
                    count={stats.total}
                    subtitle="All assigned tasks"
                    percentage={100}
                    color="#2196f3"
                    icon={CheckSquare}
                />
                <StatCard
                    title="Completed"
                    count={stats.completed}
                    subtitle="Successfully finished"
                    percentage={stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}
                    color="#4db6ac"
                    icon={Clock}
                />
                {/* Placeholder for 3rd card or chart space */}
                <div className="hidden lg:block">
                    {/* Could put a productivity score or another widget here */}
                    <StatCard
                        title="In Progress"
                        count={stats.total - stats.completed}
                        subtitle="Currently active"
                        percentage={stats.total > 0 ? Math.round(((stats.total - stats.completed) / stats.total) * 100) : 0}
                        color="#7c4dff"
                        icon={Clock}
                    />
                </div>
            </div>

            {/* Main Grid: Chart + Task List */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left: Overview Chart */}
                <div className="xl:col-span-2">
                    <OverviewChart />
                </div>

                {/* Right: Today's Tasks (List) */}
                <div className="xl:col-span-1 bg-[#1e202e]/50 rounded-3xl p-6 border border-gray-800/30">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-lg">Today's Tasks</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`text-xs px-3 py-1 rounded-full ${filter === 'all' ? 'bg-white text-black' : 'text-gray-400'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                className={`text-xs px-3 py-1 rounded-full ${filter === 'pending' ? 'bg-white text-black' : 'text-gray-400'}`}
                            >
                                Pending
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <TaskRow
                                    key={task._id}
                                    task={task}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No tasks found.</p>
                        )}
                    </div>
                </div>
            </div>

            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskCreated={fetchTasks}
            />
        </div>
    );
};

export default Dashboard;
