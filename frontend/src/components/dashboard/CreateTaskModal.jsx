import { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Flag } from 'lucide-react';
import api from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const CreateTaskModal = ({ isOpen, onClose, onTaskCreated, initialData = null }) => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        assignedTo: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Edit Mode: Pre-fill data
                setFormData({
                    title: initialData.title || '',
                    description: initialData.description || '',
                    dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
                    priority: initialData.priority || 'medium',
                    assignedTo: initialData.assignedTo?._id || initialData.assignedTo || ''
                });
            } else {
                // Reset for Create Mode
                setFormData({ title: '', description: '', dueDate: '', priority: 'medium', assignedTo: '' });
            }
        }

        if (isOpen && user?.role === 'admin') {
            // Fetch users for assignment dropdown
            const fetchUsers = async () => {
                try {
                    const { data } = await api.get('/users');
                    setUsers(data);
                } catch (error) {
                    console.error("Failed to fetch users", error);
                }
            };
            fetchUsers();
        }
    }, [isOpen, user, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { ...formData };

            if (initialData) {
                // Update existing task
                await api.put(`/tasks/${initialData._id}`, payload);
            } else {
                // Create new task
                if (!payload.assignedTo) payload.assignedTo = user._id; // Default to self if not selected
                await api.post('/tasks', payload);
            }

            onTaskCreated();
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#1e202e] w-full max-w-lg rounded-3xl p-8 border border-gray-800 shadow-2xl relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">{initialData ? 'Edit Task' : 'Create New Task'}</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">Task Title</label>
                        <input
                            type="text"
                            className="w-full bg-[#13141f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent-orange)] focus:outline-none"
                            placeholder="e.g. Redesign Landing Page"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 block mb-2">Description</label>
                        <textarea
                            className="w-full bg-[#13141f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent-orange)] focus:outline-none h-24 resize-none"
                            placeholder="Add details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 block mb-2 flex items-center gap-2">
                                <CalendarIcon size={14} /> Due Date
                            </label>
                            <input
                                type="date"
                                className="w-full bg-[#13141f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent-orange)] focus:outline-none"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-2 flex items-center gap-2">
                                <Flag size={14} /> Priority
                            </label>
                            <select
                                className="w-full bg-[#13141f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent-orange)] focus:outline-none appearance-none"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {user?.role === 'admin' && (
                        <div>
                            <label className="text-sm text-gray-400 block mb-2">Assign To</label>
                            <select
                                className="w-full bg-[#13141f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent-orange)] focus:outline-none appearance-none"
                                value={formData.assignedTo}
                                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                            >
                                <option value="">Select User</option>
                                {users.map(u => (
                                    <option key={u._id} value={u._id}>{u.username}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--color-accent-orange)] text-[#13141f] font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
                        >
                            {loading ? 'Saving...' : (initialData ? 'Update Task' : 'Create Task')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
