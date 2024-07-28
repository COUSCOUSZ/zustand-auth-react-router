import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error, user } = useAuth();
    const navigate=useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    useEffect(() => {
        console.log("useEffect rerender LoginForm.tsx");
        if (!error && user) {
            let redirectTo = new URLSearchParams(window.location.search).get("from") || "/profile";
            console.log("Redirecting to", redirectTo);
            navigate(redirectTo);
        }
    }, [user]);

    return (
        <form onSubmit={handleSubmit} >
            <input
                className='block m-2 p-1 border rounded'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                className='block m-2 p-1 border rounded'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={isLoading} className='block m-2 bg-slate-800 text-white rounded px-3 py-1'>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {/* {error && <p>{error}</p>} */}
        </form>
    );
};

export default Login;