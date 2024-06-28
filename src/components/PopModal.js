import React from 'react';
import { Modal } from 'antd';

const PopModal = (props) => {
	const { isModalOpen, handleOk, handleCancel, title } = props;
	// const {title, description } = record

	return (
		<Modal
			title="ToDo-List"
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<p>{title}</p>
			{/* <p>{description}</p> */}
		</Modal>
	);
};

export default PopModal;
