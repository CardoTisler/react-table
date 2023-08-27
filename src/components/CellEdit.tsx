import React, { useEffect } from 'react';
import { Button, Checkbox } from '@mui/material';
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
		<>
			<button onClick={handleEditedRows} name="cancel">
				X
			</button>{' '}
			<button onClick={handleEditedRows} name="done">
				✔
			</button>
		</>
	)
});
