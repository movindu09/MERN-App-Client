import React, { createContext, useEffect, useState } from 'react';
import { useNotification } from './NotificationContext';
import axios from 'axios';

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
	const [lists, setLists] = useState([]);
    const { successNotification, errorNotification } = useNotification();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/getall`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setLists(response.data.reverse());
				console.log(response.data);
				successNotification('Data has been loaded successfully.');
			} catch (error) {
				console.log(error);
				errorNotification('Unable to get the data.');
			}
		};
		fetchUsers();
	}, [successNotification, errorNotification]);

	return <TableContext.Provider value={{lists, setLists}}>{children}</TableContext.Provider>;
};
