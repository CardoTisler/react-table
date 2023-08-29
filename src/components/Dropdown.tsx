import { SetStateAction, useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';
import { CellProps } from 'react-table';

export const Dropdown = (
	{
	 	props,
	 	accessor,
	}: { props: CellProps<DataObject>; accessor: keyof DataObject })  => {

	const { row, active } = props;
	const { original } = row;
	const { options, selected: initialValue } = original[accessor] as { options: string[]; selected: string; };
	const [selectedValue, setSelectedValue] = useState<string>(initialValue);

	const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
		const { value: newValue } = e.target;

		setSelectedValue(newValue);
	}

	useEffect(() => {
		setSelectedValue(initialValue);
	}, [initialValue, props.data]);

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
			sx={{width: '100%'}}
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
