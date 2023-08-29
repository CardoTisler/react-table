import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { CellProps } from 'react-table';

export const ActiveCheckbox = ({ props, accessor }: { props: CellProps<DataObject>; accessor: keyof DataObject }) => {
	const { row, active } = props;
	const { original } = row;
	const initialValue = original[accessor] as boolean;
	const [checked, setChecked] = useState<boolean>(initialValue)

	const onChange = (e: any) => {
		const { checked: newValue } = e.target;
		setChecked(newValue);
	}

	useEffect(() => {
		setChecked(initialValue)
	}, [initialValue, props.data])

	if (!active) {
		return checked ? <CheckIcon sx={{'color': 'green'}}/> : <CheckBoxOutlineBlankIcon sx={{'color': 'gray'}} />;
	}

	return <Field name={accessor} type={"checkbox"} initialValue={checked}>
		{props => (
			<div>
				<Checkbox
					name={props.input.name}
					value={props.input.value}
					checked={checked}
					onChange={(e) => {
						onChange(e);
						props.input.onChange(e);
					}}
					checkedIcon={<CheckIcon sx={{'color': 'green'}}/>}
					icon={<CheckBoxOutlineBlankIcon />}
				/>
			</div>
		)}
	</Field>
}
