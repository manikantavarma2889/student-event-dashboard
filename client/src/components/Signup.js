import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/signup', form);
    alert('Signup Successful!');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Signup;
