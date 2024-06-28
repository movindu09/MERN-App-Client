import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const openNotification = (type, message, description) => {
		notification[type]({
			message,
			description,
		});
	};

	const successNotification = (message, description) => {
		notification.destroy();
		openNotification('success', message, description);
	};

	const errorNotification = (message, description) => {
		notification.destroy();
		openNotification('error', message, description);
	};

	return (
		<NotificationContext.Provider
			value={{ successNotification, errorNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	return useContext(NotificationContext);
};
