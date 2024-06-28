import React, { useContext, useState } from 'react';
import { TableContext } from '../TableContext';
import UserTable from '../components/UserTable';
import Nav from '../components/Nav';


const Dashboard = () => {
    const initialState = {
		_id: '',
		title: '',
		description: '',
		status: '',
	};

    const { lists, setLists } = useContext(TableContext);
    const [visible, setVisible] = useState(false);
	const [updateVisible, setUpdateVisible] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(initialState);
	const [viewVisible, setViewVisible] = useState(false);
	const [selectedViewTodo, setSelectedViewTodo] = useState(initialState);

    const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const showViewModal = (record) => {
		setSelectedViewTodo(record);
		setViewVisible(true);
	};

	const handleUpdateCancel = () => {
		setUpdateVisible(false);
	};

	const showUpdateModal = (record) => {
		setSelectedTodo(record);
		setUpdateVisible(true);
	};

	const handleViewCancel = () => {
		setViewVisible(false);
	};

	return (
		<div>
			<Nav showDashboard={true} showLogout={true} showHome={true} />
			<div className="Heading">
				<h1>ToDo - List</h1>
			</div>

			<UserTable
				data={lists}
				showModal={showModal}
				showUpdateModal={showUpdateModal}
				isModalOpen={visible}
				handleCancel={handleCancel}
				updateVisible={updateVisible}
				handleUpdateCancel={handleUpdateCancel}
				selectedTodo={selectedTodo}
				showViewModal={showViewModal}
				handleViewCancel={handleViewCancel}
				viewVisible={viewVisible}
				selectedViewTodo={selectedViewTodo}
			/>
		</div>
	);
};

export default Dashboard;
