import React from 'react';
import { Space, Table, Button, Modal, Popconfirm } from 'antd';

const UserTable = (props) => {
	const {
		showUpdateModal,
		data,
		handleDelete,
		showViewModal,
		handleViewCancel,
		viewVisible,
		selectedViewTodo,
		cancel,
	} = props;

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Actions',
			key: 'action',
			render: (text, record) => (
				<Space size="middle">
					<Button
						type="primary"
						onClick={() => showViewModal(record)}
					>
						View
					</Button>
					<Button
						type="primary"
						onClick={() => showUpdateModal(record)}
					>
						Update
					</Button>
					<Popconfirm
						title="Delete the task"
						description="Are you sure to delete this task?"
						onConfirm={() => handleDelete(record._id)}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					>
						<Button type="primary" danger>
							Delete
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div
			style={{
				width: '80%',
				margin: 'auto',
				padding: '20px',
			}}
		>
			<Table
				columns={columns}
				dataSource={data}
				size="small"
				rowKey="_id"
			/>
			<Modal
				title="View Todo"
				open={viewVisible}
				onCancel={handleViewCancel}
				footer={null}
			>
				{selectedViewTodo && (
					<>
						<p>Title: {selectedViewTodo.title}</p>
						<p>Description: {selectedViewTodo.description}</p>
						<p>Status: {selectedViewTodo.status}</p>
					</>
				)}
			</Modal>
		</div>
	);
};

export default UserTable;
