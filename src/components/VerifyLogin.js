import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../AuthContext';

const VerifyLogin = () => {
	const { userId } = useParams();
	const [list, setList] = useState(userId);
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		const token = localStorage.getItem('token');
		// console.log('Token:', token)
		
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				const loggedInUserId = decodedToken._id;
				setList(loggedInUserId);

				if (list.toString() === loggedInUserId.toString()) {
					navigate('/home');
				} else {
					console.log('logged in user does not match the user ');
					localStorage.removeItem(token);
					navigate('/login');
				}
			} catch (error) {
				console.error('Error decoding token:', error);
				navigate('/login');
			}
		} else {
			console.log('No token found');
			logout();
			navigate('/login');
		}
	}, [list, navigate]);

	return <div></div>;
};

export default VerifyLogin;
