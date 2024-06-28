import React, { useContext, useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import UpdateForm from '../components/UserForm';
import Nav from '../components/Nav';
import { useNotification } from '../NotificationContext';
import { TableContext } from '../TableContext';

const Home = () => {
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
    const { successNotification, errorNotification } = useNotification();

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

    

    const handleDelete = async (_id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/delete/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedRecords = lists.filter((record) => record._id !== _id);
            setLists(updatedRecords);
            successNotification('Successfully deleted to-do item');
        } catch (error) {
            console.error('Error deleting to-do item:', error);
            errorNotification('Unable to delete to-do item.');
        }
    };

    const onFinishHandler = async (values) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `http://localhost:5000/api/create`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLists([response.data, ...lists]);
            successNotification('Successfully added user record.');
        } catch (error) {
            console.log('Error creating to-do:', error);
            errorNotification('Unable to add the user record.');
        }
    };

    const onUpdateHandler = async (values) => {
        const token = localStorage.getItem('token');
        const _id = selectedTodo._id;
        try {
            const response = await axios.put(
                `http://localhost:5000/api/update/${_id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedRecords = lists.map((record) =>
                record._id === selectedTodo._id ? response.data : record
            );
            setLists(updatedRecords);
            setUpdateVisible(false);
            successNotification('Successfully changed user record.');
        } catch (error) {
            console.log(error);
            errorNotification('Unable to change user record.');
        }
    };

    return (
		<div>
			<Nav
				showDashboard={true}
				showLogout={true}
				showHome={true}
				showDashboard2={true}
			/>
			<div className="Heading">
				<h1>ToDo - List</h1>
			</div>
			<div
				style={{
					width: '500px',
					margin: 'auto',
					padding: '20px',
				}}
			>
				<Form
					layout="vertical"
					onFinish={onFinishHandler}
					initialValues={selectedTodo} // Populate form with selectedTodo data
					className="form-container"
				>
					<Form.Item label="Title" name="title">
						<Input />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input />
					</Form.Item>
					<Form.Item name="status" label="Status">
						<Select>
							<Select.Option value="pending">
								Pending
							</Select.Option>
							<Select.Option value="complete">
								Complete
							</Select.Option>
						</Select>
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form>
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
				handleDelete={handleDelete}
				showViewModal={showViewModal}
				handleViewCancel={handleViewCancel}
				viewVisible={viewVisible}
				selectedViewTodo={selectedViewTodo}
			/>

			<UpdateForm
				selectedTodo={selectedTodo}
				onUpdateHandler={onUpdateHandler}
				updateVisible={updateVisible}
				handleUpdateCancel={handleUpdateCancel}
			/>
		</div>
	);
};

export default Home;
