import { SetStateAction, useState } from 'react';
import { MenuItem, Select } from '@mui/material';

// TODO: Replace raw HTML with material-ui
export const Dropdown = (
	{
	 	row,
	 	accessor,
		active,
		updateData
	}: any)  => {
	const {original} = row;
	const { options, selected }: { options: string[]; selected: string; } = original[accessor];
	const [selectedValue, setSelectedValue] = useState<string>(selected);

	const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
		const { value: newValue } = e.target;

		setSelectedValue(newValue);
		updateData(row.id, accessor, newValue);
	}

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
