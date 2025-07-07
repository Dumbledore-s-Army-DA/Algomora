import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api'; // make sure path is correct

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response=await signup({ name, username, password });
      localStorage.setItem('userId', response.data.user._id);
      navigate('/sorting');
    } catch (err) {
      console.log('Signup error response:', err); // Add this
      if (err.response?.data?.error?.includes('E11000')) {
        setError('Username already exists.');
      } else {
        setError(err.response?.data?.error || 'Signup failed. Try again.');
      }
    }

  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
