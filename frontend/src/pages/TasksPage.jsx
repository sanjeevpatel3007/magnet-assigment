import { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import api from '../utils/axiosInstance';
import TaskRow from '../components/dashboard/TaskRow';
import CreateTaskModal from '../components/dashboard/CreateTaskModal';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            // Fetch tasks with pagination
            const { data } = await api.get(`/tasks?page=${page}&limit=5&status=${filter === 'all' ? '' : filter}`);
            setTasks(data.tasks);
            setTotalPages(data.pages);
        } catch (error) {
            console.error("Error fetching tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, filter]); // Re-fetch on page or filter change

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
            // Optimistic Update
            setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));

            await api.put(`/tasks/${id}`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <div className="pb-8 max-w-5xl mx-auto pt-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">My Tasks</h1>
                    <p className="text-gray-400">Manage all your assigned tasks</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[var(--color-accent-orange)] text-[#13141f] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
                >
                    <Plus size={20} /> New Task
                </button>
            </div>

            <div className="bg-[#1e202e] rounded-3xl p-8 border border-gray-800 shadow-xl">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-800 pb-4">
                    <Filter size={16} className="text-gray-400" />
                    <button
                        onClick={() => { setFilter('all'); setPage(1); }}
                        className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${filter === 'all' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        All Tasks
                    </button>
                    <button
                        onClick={() => { setFilter('pending'); setPage(1); }}
                        className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${filter === 'pending' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => { setFilter('completed'); setPage(1); }}
                        className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${filter === 'completed' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        Completed
                    </button>
                </div>

                {loading ? (
                    <div className="text-white text-center py-10">Loading tasks...</div>
                ) : (
                    <div className="space-y-4">
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <TaskRow
                                    key={task._id}
                                    task={task}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 text-lg mb-2">No tasks found</p>
                                <p className="text-gray-600 text-sm">Create a new task to get started</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-800">
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-[#2a2d40] text-white rounded-xl disabled:opacity-50 hover:bg-[#32364a] transition-colors text-sm font-bold"
                        >
                            Previous
                        </button>
                        <span className="text-gray-400 text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-[#2a2d40] text-white rounded-xl disabled:opacity-50 hover:bg-[#32364a] transition-colors text-sm font-bold"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskCreated={fetchTasks}
            />
        </div>
    );
};

export default TasksPage;
