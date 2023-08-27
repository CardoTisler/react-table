import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

export const TextInput = ({row, accessor, active, updateData}: any) => {
	// need to get value from data state, not row
	const { original } = row;
	// console.log(row);
	const initialValue = original[accessor];
	const [text, setText] = useState<string>(initialValue);

	useEffect(() => {
		setText(initialValue);
	}, [initialValue]);

	const onBlur = () => {
		updateData(row.id, accessor, text);
	}

	const onChange = (e: { target: { value: string; }; }) => {
		const { value: newValue } = e.target;
		setText(newValue);
	}

	if (!active) {
		return <span>{text}</span>
	}

	return <TextField size="small" id={"id"} variant={"outlined"} defaultValue={text} onChange={onChange} onBlur={onBlur} fullWidth/>
}
