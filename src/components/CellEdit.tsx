import React from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { DataObject } from '../utils/types';
import { Row } from 'react-table';
export const CellEdit = React.forwardRef(({ row, revertData, ...rest }: { row: Row<DataObject>; revertData: (index: number, revert: boolean) => void}, ref) => {
	const defaultRef = React.useRef();
	// Not sure how to fix this any type.
	const resolvedRef: any = ref || defaultRef;
	let active = row.isSelected;

	const handleEditedRows = (e: { currentTarget: { name: string; }; }) => {
		const elName = e.currentTarget.name;
		if (elName !== 'edit') {
			revertData(row.index, e.currentTarget.name === 'cancel');
		}
	}

	if (!active) {
		return (
			<>
				<Checkbox ref={resolvedRef} {...rest} icon={<CreateIcon />} name="edit"/>
			</>
		)
	}

	return (
		<Box sx={{'display':'flex-column'}}>
			<div>
				<IconButton name="done" sx={{'border-radius': '0%', 'padding': '2px'}} type="submit">
					<CheckIcon />
				</IconButton>
			</div>
			<div >
				<IconButton onClick={handleEditedRows} name="cancel" sx={{'border-radius': '0%', 'padding': '2px'}}>
					<CloseIcon />
				</IconButton>
			</div>
		</Box>
	)
});
