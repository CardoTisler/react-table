import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
export const MultiSelect = ({row, accessor, handleChange}: {row: any; accessor:string; handleChange: (accessor: string, newValue: any) => void;}) => {
	const { original } = row;
	const [selected, setSelected] = React.useState<string[]>(original[accessor].selected);
	const { options }: { options: string[] } = original[accessor];

	const onChange = (event: SelectChangeEvent<typeof selected>) => {
		const {
			target: { value },
		} = event;
		// On autofill we get a stringified value.
		const newValue = typeof value === 'string' ? value.split(',') : value
		setSelected(newValue);
		handleChange(accessor, newValue);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, height: '60px' }} fullWidth>
				<Select
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					multiple
					value={selected}
					onChange={onChange}
					// input={<OutlinedInput label="Name" />}
					MenuProps={MenuProps}
					sx={{height: '30px', width: '180px'}}
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
			</FormControl>
		</div>
	);
}
