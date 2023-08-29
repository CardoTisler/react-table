import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';

export const TextInput = ({ accessor, props }: { props: any; accessor: keyof DataObject }) => {
	const { row, active } = props;
	const { updateData } = props.meta;
	const { original } = row;
	const initialValue = original[accessor];
	const [text, setText] = useState<string>(initialValue);

	useEffect(() => {
		setText(initialValue);
	}, [initialValue]);

	// const onBlur = () => {
	// 	updateData(row.id, accessor, text);
	// }

	const onChange = (e: { target: { value: string; }; }) => {
		const { value: newValue } = e.target;
		setText(newValue);
	}

	if (!active) {
		return <span>{text}</span>
	}

	return <Field name={accessor} initialValue={text}>
		{props => (
			<div>
				<TextField
					name={props.input.name}
					onChange={(e) => {
						props.input.onChange(e);
						onChange(e);
					}}
					size="small"
					variant="outlined"
					defaultValue={text}
					// onBlur={onBlur}
				/>
			</div>
		)}
	</Field>

}
