import React from 'react';
import { Space, Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const TodoLists = (props) => {
	const { data} = props;
    const navigate = useNavigate();

	const handleViewClick = (record) => {
        console.log(record)
		navigate(`/verify/${record.user_id}`);
	};

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
			title: 'User ID',
			dataIndex: 'userId',
			key: 'userId',
			render: (text, record) => (
				<Space size="middle">
					<span>{record.email}</span>
					<Button
						type="primary"
						onClick={() => handleViewClick(record)}
					>
						View
					</Button>
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
		</div>
	);
};

export default TodoLists;
