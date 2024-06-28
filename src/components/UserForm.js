import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import DropdownMenu from './DropdownMenu';

const UpdateForm = (props) => {
	const { selectedTodo, onUpdateHandler, updateVisible, handleUpdateCancel } =
		props;

	const [form] = Form.useForm();
	const [status, setStatus] = useState(selectedTodo.status);

	useEffect(() => {
		form.resetFields();
		setStatus(selectedTodo.status);
	}, [selectedTodo, form]);

	const onStatusChange = (newStatus) => {
		setStatus(newStatus);
	};

	return (
		<Modal
			title="Update Todo"
			open={updateVisible}
			onCancel={handleUpdateCancel}
			footer={null}
		>
			{selectedTodo && (
				<Form
					form={form}
					layout="vertical"
					initialValues={{ ...selectedTodo, status }}
					onFinish={(values) =>
						onUpdateHandler({ ...values, status }, selectedTodo._id)
					}
				>
					<Form.Item label="Title" name="title">
						<Input />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input />
					</Form.Item>
					<Form.Item label="Status" name="status">
						<DropdownMenu
							status={status}
							onStatusChange={onStatusChange}
						/>
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Update
					</Button>
				</Form>
			)}
		</Modal>
	);
};

export default UpdateForm;
