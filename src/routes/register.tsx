import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { RegisterData } from '../types/auth';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterData>({
        email: '',
        username: '',
        type: 'client',
        password: '',
        re_password: '',
        first_name: '',
        last_name: '',
    });
    console.log("RegisterForm.tsx useAuth");
    const { register, isLoading, error } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                type="password"
                name="re_password"
                value={formData.re_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
            />
            <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;