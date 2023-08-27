import { useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const ActiveCheckbox = ({row, accessor, handleChange}: {row: any; accessor: string; handleChange: (accessor: string, newValue: any) => void;}) => {
	const { original } = row;
	const [checked, setChecked] = useState<boolean>(original[accessor])

	const onChange = (e: any) => {
		const { checked: newValue } = e.target;
		setChecked(newValue)
		handleChange(`${accessor}`, newValue);
	}

	return <Checkbox
		checked={checked}
		onChange={(e) => onChange(e)}
		checkedIcon={<CheckIcon sx={{'color': 'green'}}/>}
		icon={<ClearIcon sx={{'color': 'red'}} />}
	/>
}
