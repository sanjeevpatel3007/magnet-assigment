import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(username, password);
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
                    <div className="bg-[var(--color-accent-orange)] p-3 rounded-2xl">
                        <LogIn className="text-white w-8 h-8" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-[var(--color-text-primary)] mb-2 font-['Outfit']">
                    Welcome Back
                </h2>
                <p className="text-center text-[var(--color-text-secondary)] mb-8">
                    Please sign in to your account
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[var(--color-text-secondary)] text-sm mb-2 ml-1">Username</label>
                        <input
                            type="text"
                            className="w-full bg-[#13141f] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent-purple)] transition-colors"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-secondary)] text-sm mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-[#13141f] text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent-purple)] transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[var(--color-accent-orange)] text-[#13141f] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-[var(--color-text-secondary)]">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[var(--color-accent-orange)] hover:underline font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
