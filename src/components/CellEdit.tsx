import React from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
export const CellEdit = React.forwardRef(({ row, setEditedRows, revertData, ...rest }: any, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef: any = ref || defaultRef;
	let active = row.isSelected;

	const handleEditedRows = (e: any) => {
		const elName = e.currentTarget.name;
		setEditedRows((old: []) => ({
			...old,
			[row.id]: !old[row.id],
		}));
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
