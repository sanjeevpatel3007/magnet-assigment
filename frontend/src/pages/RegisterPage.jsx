import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await register(username, password, role);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-main)]">
            <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-800">
                <div className="flex justify-center mb-6">
                    <div className="bg-[var(--color-accent-purple)] p-3 rounded-2xl">
                        <UserPlus className="text-white w-8 h-8" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-[var(--color-text-primary)] mb-2 font-['Outfit']">
                    Create Account
                </h2>
                <p className="text-center text-[var(--color-text-secondary)] mb-8">
                    Join us to organize your tasks
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[var(--color-text-secondary)] text-sm mb-2 ml-1">Username</label>
                        <input
                            type="text"
                            className="w-full bg-[#13141f] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent-orange)] transition-colors"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-secondary)] text-sm mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-[#13141f] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent-orange)] transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-secondary)] text-sm mb-2 ml-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-[#13141f] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent-orange)] transition-colors appearance-none"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[var(--color-accent-purple)] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-8 text-center text-[var(--color-text-secondary)]">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
