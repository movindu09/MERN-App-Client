import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const getUser = () => {
	if (window !== 'undefined') {
		if (localStorage.getItem('token')) {
			return (localStorage.getItem('token'));
		} else {
			return false;
		}
	}
};

const ProtectedRoutes = () => {
	const isAuth = getUser() ;
	// console.log(isAuth)
	return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
