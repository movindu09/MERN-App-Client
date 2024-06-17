import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { successNotification, errorNotification } from '../components/Message';

const { Text, Title } = Typography;

const styles = {
	container: {
		margin: '0 auto',
		width: '380px',
	},
	forgotPassword: {
		float: 'right',
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

const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		console.log('Success:', values);
		const { email, password } = values;
		try {
			const response = await axios.post(
				'http://localhost:5000/api/login',
				{
					email,
					password,
				}
			);
			console.log(response.data);
			if (response.data.status === 'success') {
				localStorage.setItem('token', response.data.token);
				successNotification('Login successful');
				navigate('/home');
			}
		} catch (error) {
			console.log('Error:', error);
			if (error.response && error.response.data.errors) {
				const errorMessages = error.response.data.errors;
				errorNotification('Login failed', errorMessages.join(', '));
			} else {
				errorNotification(
					'Login failed',
					'An unexpected error occurred'
				);
			}
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<section style={styles.section}>
			<div style={styles.container}>
				<div style={styles.header}>
					<Title>Login</Title>
				</div>
				<Form
					form={form}
					name="login_form"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					layout="vertical"
					requiredMark="optional"
				>
					<Form.Item
						name="email"
						rules={[
							{
								type: 'email',
								message: 'Please input your Email!',
							},
						]}
					>
						<Input prefix={<MailOutlined />} placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								message: 'Please input your Password!',
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
							Login
						</Button>
						<div style={styles.signup}>
							<Text>Don't have an account?</Text>{' '}
							<Link to="/register">Sign up</Link>
						</div>
					</Form.Item>
				</Form>
			</div>
		</section>
	);
};

export default Login;
