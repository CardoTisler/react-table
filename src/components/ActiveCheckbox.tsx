import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CheckBox } from '@mui/icons-material';

export const ActiveCheckbox = ({ props, accessor }: { props: any; accessor: keyof DataObject }) => {
	const { row, active } = props;
	const { updateData } = props.meta;
	const { original } = row;
	const initialValue = original[accessor];
	const [checked, setChecked] = useState<boolean>(initialValue)

	const onChange = (e: any) => {
		const { checked: newValue } = e.target;
		setChecked(newValue);
		// updateData(row.id, accessor, newValue);
	}

	useEffect(() => {
		setChecked(initialValue)
	}, [initialValue])

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
