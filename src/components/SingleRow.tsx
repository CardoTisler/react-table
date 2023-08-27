import type { Cell, Row } from 'react-table';
import type { DataObject } from '../utils/types';
import { TableCell, TableRow } from '@mui/material';

export const SingleRow = ({row, selectedRows}: {row: Row<DataObject>; selectedRows: Row<DataObject>[]}) => {
	const { id } = row;
	const active = selectedRows ? selectedRows.some((row: Row<DataObject>) => row.id === id) : false;

	return (
		<TableRow {...row.getRowProps()}>
			{
				row.cells.map((cell: Cell<DataObject>) => (
					<TableCell sx={{'width': '175px'}} {...cell.getCellProps()}>{cell.render('Cell', { active })}</TableCell>
				))
			}
		</TableRow>
	)
}
