import type { Cell, Row } from 'react-table';
import type { DataObject } from '../utils/types';
import { useMemo, useState } from 'react';
import { Button } from '@mui/material';

// handle each row state separately to allow updating table row-by-row
export const SingleRow = ({row, handleSubmit}: {row: Row<DataObject>; handleSubmit: (state: DataObject) => void;}) => {
	const { original } = row;
	const initialValue = useMemo(() => original, []);
	const [state, setState] = useState<DataObject>(initialValue);

	const handleChange = (accessor: keyof DataObject, newValue: any) => {
		setState(prevState => {
			return {
				...prevState,
				...(typeof prevState[accessor] === 'string' || typeof prevState[accessor] === 'boolean' ? {
					[accessor]: newValue
				}: {
					[accessor]: {
						...prevState[accessor] as unknown as object,
						selected: newValue,
					}
				})
			}
		});
	}

	return (
		<tr {...row.getRowProps()}>
			{
				row.cells.map((cell: Cell<DataObject>) => (
					<td {...cell.getCellProps()}>{cell.render('Cell', { handleChange })}</td>
				))
			}
			<Button onClick={() => handleSubmit(state)}>Submit</Button>
		</tr>
	)
}
