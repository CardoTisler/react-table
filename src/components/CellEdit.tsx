import React from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

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
				<IconButton onClick={handleEditedRows} name="done" sx={{'border-radius': '0%', 'padding': '2px'}}>
					✔
				</IconButton>
			</div>
			<div>
				<IconButton onClick={handleEditedRows} name="cancel" sx={{'border-radius': '0%', 'padding': '2px', 'margin-right': '4px'}}>
					X
				</IconButton>
			</div>
		</Box>
	)
});
