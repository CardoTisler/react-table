import { useState } from 'react';
import { TextField } from '@mui/material';

export const TextInput = ({row, accessor, handleChange}: {row: any; accessor: string; handleChange: (accessor: string, newValue: any) => void;}) => {
	const { original } = row;
	const [text, setText] = useState<string>(original[accessor]);
	// TODO: Handle change

	const onChange = (e: { target: { value: string; }; }) => {
		const { value: newValue } = e.target;
		setText(newValue);
		handleChange(`${accessor}`, newValue);
	}

	return <TextField id={"id"} variant={"outlined"} defaultValue={text} onChange={onChange} />
}
