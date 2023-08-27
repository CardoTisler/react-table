import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';

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

export const MultiSelect = ({ props, accessor }: { props: any; accessor: keyof DataObject }) => {
	const { row, active} = props;
	const { updateData } = props.meta;
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
		return <span>{selected.length ? selected.join(', ') : '-'}</span>
	}

	return (
		<Field name={accessor} type="select" initialValue={selected}>
			{props => (
				<Select
					name={props.input.name}
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					multiple
					value={selected}
					onChange={(e) => {
						onChange(e);
						props.input.onChange(e);
					}}
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
			)}
		</Field>
	)
}
