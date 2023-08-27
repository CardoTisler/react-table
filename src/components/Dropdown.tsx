import { SetStateAction, useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { DataObject } from '../utils/types';

export const Dropdown = (
	{
	 	props,
	 	accessor,
	}: { props: any; accessor: keyof DataObject })  => {
	const { row, active, updateData } = props;
	const {original} = row;
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
	<Select defaultValue={selectedValue} onChange={onChange} size="small">
		{options.map((value) => {
				return <MenuItem value={value} key={value}>
					{value}
				</MenuItem>
			})}
	</Select>
	)
}
