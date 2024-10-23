import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Logs.css'; // Import a custom CSS file for styling
import { useNavigate } from 'react-router-dom';

const Logs = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    // Redirect if the user is not authorized
    if (userEmail !== 'noumansh533@gmail.com') {
      navigate('/login'); // Redirect to login if not authorized
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://apii-cyan.vercel.app/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://apii-cyan.vercel.app/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await axios.put(`https://apii-cyan.vercel.app/api/users/${userId}/toggle`);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="page-title">User Logs</h2>
      <div className="card-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.email}</h3>
            <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
            <div className="button-group">
              <button
                className={`toggle-btn ${user.isActive ? 'disallow' : 'allow'}`}
                onClick={() => handleToggleStatus(user._id)}
              >
                {user.isActive ? 'Disallow' : 'Allow'}
              </button>
              <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logs;
