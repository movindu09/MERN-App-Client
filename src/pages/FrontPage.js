import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import TodoLists from '../components/TodoLists';
import { useNotification } from '../NotificationContext';

const FrontPage = () => {
	const [lists, setLists] = useState([]);

	const { successNotification, errorNotification } = useNotification();

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/gettodo`
				);
				setLists(response.data.reverse());
				console.log(response.data);
				successNotification('Data has been loaded successfully.');
			} catch (error) {
				console.log(error);
				errorNotification('Unable to get the data.');
			}
		};
		fetchTodos();
	}, []);

	return (
		<div>
			<Nav showLogin={true} showHome={true} showLogout={true}/>
			<TodoLists data={lists} />
		</div>
	);
};

export default FrontPage;
