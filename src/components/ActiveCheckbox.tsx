import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const ActiveCheckbox = ({row, accessor, active, updateData}: any) => {
	const { original } = row;
	const initialValue = original[accessor];
	const [checked, setChecked] = useState<boolean>(initialValue)

	const onChange = (e: any) => {
		const { checked: newValue } = e.target;
		setChecked(newValue);
		updateData(row.id, accessor, newValue);
	}

	useEffect(() => {
		setChecked(initialValue)
	}, [initialValue])

	if (!active) {
		return checked ? <CheckIcon sx={{'color': 'green'}}/> : <ClearIcon sx={{'color': 'red'}} />;
	}

	return <Checkbox
		checked={checked}
		onChange={(e) => onChange(e)}
		checkedIcon={<CheckIcon sx={{'color': 'green'}}/>}
		icon={<ClearIcon sx={{'color': 'red'}} />}
	/>
}
