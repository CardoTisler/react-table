import { SetStateAction, useState } from 'react';

// TODO: Replace raw HTML with material-ui
export const Dropdown = ({
							 row,
							 accessor,
							 handleChange
						 }: { row: any; accessor: string; handleChange: (accessor: string, newValue: any) => void; }) => {
	const {original} = row;
	const { options, selected }: { options: string[]; selected: string; } = original[accessor];
	const [selectedValue, setSelectedValue] = useState<string>(selected);

	const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
		const { value: newValue } = e.target;
		setSelectedValue(newValue);
		handleChange(`${accessor}`, newValue);
	}

	return (
	<select defaultValue={selectedValue} onChange={onChange}>
		{options.map((value) => {
				return <option value={value} key={value}>
					{value}
				</option>
			})}
	</select>
	)
}
