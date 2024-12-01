import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormStyles.css';
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/users/register', formData);
            setMessage({ text: 'Registration successful! Redirecting to login...', type: 'success' });
            console.log('Registration Data:', response.data);
            
            // Navigate to the login page after a short delay to display the message
            setTimeout(() => {
                navigate('/login');
            }, 1500); // Adjust delay as needed
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Registration failed. Please try again.',
                type: 'error'
            });
            console.error('Registration Error:', err);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
                {message.text && (
                    <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
                        {message.text}
                    </div>
                )}
            </form>
            <p className='login-link-register'>
                Already an user? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default Register;