import { DataObject } from '../utils/types';
import { Dropdown } from '../components/Dropdown';

export const DATA: DataObject[] = [{
    name: 'name1',
    type: {
        options: [{value: 'agent-tool', label: "Agent tool"}, {value:'online-store', label: 'Online store'}],
        selected: {value: 'agent-tool', label: "Agent tool"}
    },
    typeOfTool: 'tool1',
    extReference: 'ref1',
    active: 'true'
},{
    name: 'name2',
    type: {
        options: [{value: 'agent-tool', label: "Agent tool"}, {value:'online-store', label: 'Online store'}],
        selected: {value: 'agent-tool', label: "Agent tool"}
    },
    typeOfTool: 'tool2',
    extReference: 'ref2',
    active: 'true'
},{
    name: 'name3',
    type: {
        options: [{value: 'agent-tool', label: "Agent tool"}, {value:'online-store', label: 'Online store'}],
        selected: { value: 'online-store', label: 'Online store' }
    },
    typeOfTool: 'tool3',
    extReference: 'ref3',
    active: 'false'
}];

export const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name' as keyof DataObject
    },
    {
        Header: 'Type',
        accessor: 'type.selected' as keyof DataObject,
        Cell: ({row}: {row: any}) => (<Dropdown row={row} accessor={'type'}/>)
    },
    {
        Header: 'Type of tool',
        accessor: 'typeOfTool' as keyof DataObject
    },
    {
        Header: 'External Reference',
        accessor: 'extReference' as keyof DataObject
    },
    {
        Header: 'Active',
        accessor: 'active' as keyof DataObject
    }
]
