import type { Cell, Row } from 'react-table';
import type { DataObject } from '../utils/types';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';

// handle each row state separately to allow updating table row-by-row
export const SingleRow = ({row, selectedRows}: {row: Row<DataObject>; selectedRows: any[]}) => {
	const { id } = row;
	const active = selectedRows ? selectedRows.some((row: any) => row.id === id) : false;

	return (
		<TableRow {...row.getRowProps()}>
			{
				row.cells.map((cell: Cell<DataObject>) => (
					// <td {...cell.getCellProps()}>{cell.render('Cell', { active })}</td>
					<TableCell sx={{'width': '175px'}} {...cell.getCellProps()}>{cell.render('Cell', { active })}</TableCell>
				))
			}
			{/*<Button onClick={() => handleSubmit(state)}>Submit</Button>*/}
		</TableRow>
	)
}
