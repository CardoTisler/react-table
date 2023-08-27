import { SetStateAction, useEffect, useState } from 'react';
import { MenuItem, Select, TextField } from '@mui/material';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';

export const Dropdown = (
	{
	 	props,
	 	accessor,
	}: { props: any; accessor: keyof DataObject })  => {
	const { row, active } = props;
	const { updateData } = props.meta;
	const { original } = row;
	const { options, selected: initialValue }: { options: string[]; selected: string; } = original[accessor];
	const [selectedValue, setSelectedValue] = useState<string>(initialValue);

	const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
		const { value: newValue } = e.target;

		setSelectedValue(newValue);
		updateData(row.id, accessor, newValue);
	}

	useEffect(() => {
		setSelectedValue(initialValue);
	}, [initialValue]);

	if (!active) {
		return <span>{selectedValue}</span>
	}

	return (
		<Field name={accessor} type={"select"} initialValue={selectedValue}>
		{props => (
			<Select
			defaultValue={selectedValue}
			onChange={(e) => {
				onChange(e);
				props.input.onChange(e);
		}}
			size="small"
			name={props.input.name}
			>
		{options.map((value) => {
			return <MenuItem value={value} key={value}>
		{value}
			</MenuItem>
		})}
			</Select>
		)}
	</Field>
	)
}
