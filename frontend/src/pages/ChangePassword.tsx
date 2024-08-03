import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import axios from 'axios';
import { decodedTokenType } from './PublicProfile';
import { jwtDecode } from 'jwt-decode';
import { BackendUrl } from '../Config';

export const ChangePassword: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (token === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-slate-700">
          <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome!</h1>
            <p className="text-lg mb-6 text-gray-600">Please choose an option to continue</p>
            <div className="space-x-4">
              <Link to="/home">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
                  Home
                </button>
              </Link>
              <Link to="/signin">
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
        );
    }

    const userData: decodedTokenType = jwtDecode(token);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            const response = await axios.put(`${BackendUrl}/user/${userData.username}/changepassword`, {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: token
                }
            });
            if(response.status === 200){
                navigate("/signin");
                localStorage.clear();
            }
            else{
                setError('wrong password');
            }
                // Optionally, you can redirect the user or clear the form
               
        } catch (err) {
            setError('Failed to change password');
            setSuccess('');
        }
    };

    return (
        <div>
            <AppBar userData={userData} />
            <div className="flex flex-col items-center mt-24">
                <div className="w-full max-w-sm">
                    <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}
                    <form onSubmit={handlePasswordChange}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current-password">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="current-password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new-password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
