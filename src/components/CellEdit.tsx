import React from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { DataObject } from '../utils/types';
import { Row } from 'react-table';
export const CellEdit = React.forwardRef(({ row, revertData, setFieldId, ...rest }: {setFieldId: (n: number) => void; row: Row<DataObject>; revertData: (index: number, revert: boolean) => void}, ref) => {
	const defaultRef = React.useRef();
	// Not really sure how to fix this any type.
	const resolvedRef: any = ref || defaultRef;
	let active = row.isSelected;

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
				<IconButton name="done" sx={{'borderRadius': '0%', 'padding': '2px'}} type="submit" onClick={() => setFieldId(row.index)}>
					<CheckIcon />
				</IconButton>
			</div>
			<div >
				<IconButton onClick={() => revertData(row.index, true)} name="cancel" sx={{'borderRadius': '0%', 'padding': '2px'}}>
					<CloseIcon />
				</IconButton>
			</div>
		</Box>
	)
});
