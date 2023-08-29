import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';
import { CellProps } from 'react-table';

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

export const MultiSelect = ({ props, accessor }: { props: CellProps<DataObject>; accessor: keyof DataObject; }) => {
	const { row, active} = props;
	const { original } = row;
	const { selected: initialValue, options} = original[accessor] as { options: string[]; selected: string[] };
	const [selected, setSelected] = React.useState<string[]>(initialValue);

	const onChange = (event: SelectChangeEvent<typeof selected>) => {
		const {
			target: { value },
		} = event;

		const newValue = typeof value === 'string' ? value.split(',') : value
		setSelected(newValue);
	};

	useEffect(() => {
		setSelected(initialValue);
	}, [initialValue, props.data])

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
					size="small"
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
