import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';

const ITEM_HEIGHT = 24;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
// TODO: Fix UI, currently its floating, should be parallel with the rest
export const MultiSelect = ({row, accessor, active, updateData}: any) => {
	const { original } = row;
	const initialValue = original[accessor].selected;
	const [selected, setSelected] = React.useState<string[]>(initialValue);
	const { options }: { options: string[] } = original[accessor];

	const onChange = (event: SelectChangeEvent<typeof selected>) => {
		const {
			target: { value },
		} = event;

		const newValue = typeof value === 'string' ? value.split(',') : value
		setSelected(newValue);
		updateData(row.id, accessor, newValue);
	};

	useEffect(() => {
		setSelected(initialValue);
	}, [initialValue])

	if (!active) {
		console.log(selected);
		return <span>{selected.length ? selected.join(', ') : '-'}</span>
	}

	return (
		<>
				<Select
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					multiple
					value={selected}
					onChange={onChange}
					MenuProps={MenuProps}
					sx={{height: '40px', width: '180px'}}
				>
					{options.map((value) => (
						<MenuItem
							key={value}
							value={value}
						>
							{value}
						</MenuItem>
					))}
				</Select>
		</>
	);
}
