import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the logged-in user's email from localStorage
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    // Clear user email from localStorage on logout
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 flex-col items-center">
                <img className="h-10 w-12" src="/logo.jpeg" alt="Your Company" />
                <div className="" style={{ fontSize: '9px', color: 'white' }}>Ezeehollytrip</div>
              </div>

              <div className="hidden sm:ml-6 sm:block mt-2">
                <div className="flex space-x-4">
                  <NavLink
                    to="/form"
                    className={({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  >
                    Entries
                  </NavLink>
                  <NavLink
                    to="/display"
                    className={({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  >
                    Display
                  </NavLink>
                  <NavLink
                    to="/driver-details"
                    className={({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  >
                    Driver Details
                  </NavLink>

                  {/* Conditionally render Logs link based on userEmail */}
                  {userEmail === 'noumansh533@gmail.com' && (
                    <NavLink
                      to="/logs"
                      className={({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                      Logs
                    </NavLink>
                  )}
                </div>
              </div>
            </div>

         
            {userEmail === 'noumansh533@gmail.com' && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" style={{ marginTop: '13px' }}>
                <NavLink to="/signup">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Create new user
                    </span>
                  </button>
                </NavLink>
              </div>
            )}

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" style={{ marginTop: '13px' }}>
              <button
                onClick={handleLogout}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
