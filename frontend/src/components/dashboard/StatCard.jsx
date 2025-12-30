import { ArrowUpRight } from 'lucide-react';

const CircularProgress = ({ value, color }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-gray-700"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke={color}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-white">{value}%</span>
        </div>
    );
};

const StatCard = ({ title, count, subtitle, percentage, color, icon: Icon }) => {
    return (
        <div className="bg-[#1e202e] rounded-3xl p-6 flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow border border-gray-800/50">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-${color}-500/10`}>
                    {Icon && <Icon className="w-6 h-6" style={{ color: color }} />}
                </div>
                <div>
                    <div className="flex items-end gap-2">
                        <h3 className="text-2xl font-bold text-white leading-none">{count}</h3>
                        <p className="text-sm text-gray-400 font-medium mb-1">{title}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                </div>
            </div>

            <CircularProgress value={percentage} color={color} />
        </div>
    );
};

export default StatCard;
