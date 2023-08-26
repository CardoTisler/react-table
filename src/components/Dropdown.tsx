import { useState } from 'react';
import type { Option } from '../utils/types';
export const Dropdown = ({row, accessor}: {row: any; accessor: string;}) => {
	const { id, original } = row;
	const { options }: { options: Option[]} = original[accessor];
	const [selected, setSelected] = useState<string>(original[accessor].selected.value);
	console.log({selected, id});
	return (
	<select defaultValue={selected} onChange={e => setSelected(e.target.value)}>
		{options.map(({ value, label }) => {
				return <option value={value} key={value}>
					{label}
				</option>
			})}
	</select>
	)
}
