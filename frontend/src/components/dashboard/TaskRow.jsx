import { Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const TaskRow = ({ task, onToggleStatus }) => {
    const isCompleted = task.status === 'completed';

    const priorityColors = {
        high: 'bg-red-500/20 text-red-400',
        medium: 'bg-blue-500/20 text-blue-400',
        low: 'bg-green-500/20 text-green-400'
    };

    return (
        <div className="bg-[#1e202e] p-4 rounded-2xl flex items-center justify-between group hover:bg-[#252836] transition-colors mb-3 border border-gray-800/30">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onToggleStatus(task._id, task.status)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isCompleted ? 'bg-[var(--color-accent-green)] text-white' : 'bg-[#2a2d40] text-gray-500 hover:text-[var(--color-accent-orange)]'
                        }`}
                >
                    <CheckCircle className="w-5 h-5" />
                </button>
                <div>
                    <Link to={`/task/${task._id}`}>
                        <h4 className={`font-semibold text-white hover:text-[var(--color-accent-orange)] transition-colors ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h4>
                    </Link>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${priorityColors[task.priority] || priorityColors.medium}`}>
                    {task.priority}
                </span>
                {/* Only show assignee if admin or different user context, for now just Avatar placeholder */}
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border border-[#1e202e]">
                    {task.assignedTo?.username?.[0]?.toUpperCase() || 'U'}
                </div>
            </div>
        </div>
    );
};

export default TaskRow;
