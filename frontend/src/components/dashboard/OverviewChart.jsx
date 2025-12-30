import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
    { name: 'Sun', tasks: 12 },
    { name: 'Mon', tasks: 14 },
    { name: 'Tue', tasks: 18 },
    { name: 'Wed', tasks: 16 },
    { name: 'Thu', tasks: 22 },
    { name: 'Fri', tasks: 20 },
    { name: 'Sat', tasks: 18 },
];

const OverviewChart = () => {
    return (
        <div className="bg-[#1e202e] rounded-3xl p-6 h-[320px] shadow-lg border border-gray-800/50 relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Overview</h3>
                <button className="text-gray-400 hover:text-white">•••</button>
            </div>

            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffb74d" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ffb74d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2d40" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2a2d40', borderRadius: '12px', border: 'none', color: '#fff' }}
                            itemStyle={{ color: '#ffb74d' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="tasks"
                            stroke="#ffb74d"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTasks)"
                        />
                        {/* Annotation for "22 Tasks Completed" */}
                        <circle cx="66%" cy="25%" r="5" fill="#7c4dff" stroke="#fff" strokeWidth={2} className="recharts-layer" />
                    </AreaChart>
                </ResponsiveContainer>

                {/* Floating Tooltip Simulation */}
                <div className="absolute top-[30%] left-[60%] bg-white text-[#13141f] px-3 py-1 rounded-full text-xs font-bold shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                    22 Tasks Completed ↗
                </div>
            </div>
        </div>
    );
};

export default OverviewChart;
