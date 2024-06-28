// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userName, setUserName] = useState(null);
	const [token, setToken] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
	const checkAuth = () => {
		const token = localStorage.getItem('token');

		if (!token) {
			navigate('/login');
		}
	};

	checkAuth();
}, [navigate]);

    
	const logout = () => {
		localStorage.removeItem('token');
		setUserName(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ userName, setUserName, token, setToken, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

