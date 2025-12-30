import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Flag, Trash2, Edit, CheckCircle } from 'lucide-react';
import api from '../utils/axiosInstance';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import CreateTaskModal from '../components/dashboard/CreateTaskModal';
import ConfirmationModal from '../components/common/ConfirmationModal';

const TaskDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchTask = async () => {
        try {
            const { data } = await api.get(`/tasks/${id}`);
            setTask(data);
        } catch (error) {
            console.error("Error fetching task", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${id}`);
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete");
        }
    };

    if (loading) return <div className="text-white p-10">Loading...</div>;
    if (!task) return <div className="text-white p-10">Task not found</div>;

    return (
        <div className="max-w-3xl mx-auto pt-8">
            <button
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-white flex items-center gap-2 mb-6"
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <div className="bg-[#1e202e] rounded-3xl p-8 border border-gray-800 shadow-2xl relative">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize mb-4 flex items-center gap-1 w-fit ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            task.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                            }`}>
                            <Flag className="w-3 h-3" /> {task.priority} Priority
                        </span>
                        <h1 className="text-4xl font-bold text-white mb-4">{task.title}</h1>
                    </div>
                    {/* Actions for Admin or Owner */}
                    {(user?.role === 'admin' || task.createdBy?._id === user?._id) && (
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="p-3 bg-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="p-3 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex gap-6 text-gray-400 mb-8 border-b border-gray-800 pb-8">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>Due: {format(new Date(task.dueDate), 'MMMM do, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className={`w-5 h-5 ${task.status === 'completed' ? 'text-green-400' : 'text-gray-500'}`} />
                        <span className="capitalize">Status: {task.status}</span>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none">
                    <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {task.description || "No description provided."}
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 flex gap-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                                {task.assignedTo?.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white">{task.assignedTo?.username}</span>
                        </div>
                    </div>
                </div>
            </div>

            {task && (
                <CreateTaskModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onTaskCreated={fetchTask}
                    initialData={task}
                />
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Task?"
                message="Are you sure you want to delete this task? This action cannot be undone."
                confirmText="Delete Task"
                isDangerous={true}
            />
        </div>
    );
};

export default TaskDetailsPage;
