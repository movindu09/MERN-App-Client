import React from 'react';
import { Select } from 'antd';

const DropdownMenu = (props) => {

const {status, onStatusChange} = props

	const handleChange = (value) => {
		onStatusChange(value);
	};

	return (
		<Select defaultValue={status} onChange={handleChange}>
			<Select.Option value="pending">Pending</Select.Option>
			<Select.Option value="complete">Complete</Select.Option>
		</Select>
	);
};

export default DropdownMenu;
