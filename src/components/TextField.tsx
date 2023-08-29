import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { DataObject } from '../utils/types';
import { Field } from 'react-final-form';
import { CellProps } from 'react-table';

export const TextInput = ({ accessor, props }: { props: CellProps<DataObject>; accessor: keyof DataObject }) => {
	const { row, active } = props;
	const { original } = row;
	const initialValue = original[accessor] as string;
	const [text, setText] = useState<string>(initialValue);

	useEffect(() => {
		setText(initialValue);
	}, [initialValue, props.data]);

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
				/>
			</div>
		)}
	</Field>

}
