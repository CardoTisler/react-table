import type { Cell, Row } from 'react-table';
import type { DataObject } from '../utils/types';
import { TableCell, TableRow } from '@mui/material';

const getSx = (index: number) => {
	return index === 0 ? { width: '0px', padding: '0px 16px 0px 16px'} : { width: '175px', padding: '0px 16px 0px 16px'}
}

export const SingleRow = ({ row }: { row: Row<DataObject> }) => {
	const active = row.isSelected;

	return (
		<TableRow {...row.getRowProps()} sx={ active ? {'backgroundColor': 'rgb(237,230,255)'} : {}}>
			{
				row.cells.map((cell: Cell<DataObject>, index) => (
					<TableCell sx={getSx(index)} {...cell.getCellProps()}>{cell.render('Cell', { active })}</TableCell>
				))
			}
		</TableRow>
	)
}
