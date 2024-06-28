import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import { useNotification } from '../NotificationContext';


const { Text, Title } = Typography;

const styles = {
	container: {
		margin: '0 auto',
		width: '380px',
	},
	header: {
		textAlign: 'center',
	},
	section: {
		alignItems: 'center',
		display: 'flex',
	},
	signup: {
		textAlign: 'center',
		width: '100%',
	},
};

const Signup = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { successNotification, errorNotification } = useNotification();

	const onFinish = async (values) => {
		console.log('Success:', values);
		const { name, email, password } = values;

		try {
			const response = await axios.post(
				'http://localhost:5000/api/register',
				{
					name,
					email,
					password,
				}
			);
			console.log('response', response.data);

			if (response.data.statusCode === 201) {
				successNotification('Successfully created user');
				navigate('/login');
			}
		} catch (error) {
			console.log('Error:', error);
			if (error.response && error.response.data.errors) {
				const errorMessages = Object.values(error.response.data.errors);
				errorNotification(
					'Cannot create user',
					errorMessages.join(', ')
				);
			} else {
				errorNotification(
					'Cannot create user',
					'An unexpected error occurred'
				);
			}
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<Nav showLogin={true} showHome={true} />
			<section style={styles.section}>
				<div style={styles.container}>
					<div style={styles.header}>
						<Title>Sign up</Title>
					</div>
					<Form
						form={form}
						name="normal_signup"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						layout="vertical"
						requiredMark="optional"
					>
						<Form.Item
							name="name"
							rules={[
								{
									message: 'Please input your Name!',
								},
							]}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="Name"
							/>
						</Form.Item>
						<Form.Item
							name="email"
							rules={[
								{
									type: 'email',

									message: 'Please input your Email!',
								},
							]}
						>
							<Input
								prefix={<MailOutlined />}
								placeholder="Email"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							extra="Password needs to be at least 8 characters."
							rules={[
								{
									message: 'Please input your Password!',
								},
								{
									min: 8,
									message:
										'Password must be at least 8 characters!',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item style={{ marginBottom: '0px' }}>
							<Button block type="primary" htmlType="submit">
								Sign up
							</Button>
							<div style={styles.signup}>
								<Text>Already have an account?</Text>{' '}
								<Link to="/login">Sign in</Link>
							</div>
						</Form.Item>
					</Form>
				</div>
			</section>
		</div>
	);
};

export default Signup;
