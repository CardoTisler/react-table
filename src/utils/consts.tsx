import { DataObject } from '../utils/types';
import { Dropdown } from '../components/Dropdown';
import { MultiSelect } from '../components/MultiSelect';
import { TextInput } from '../components/TextField';
import { ActiveCheckbox } from '../components/ActiveCheckbox';
import { CellProps, Column } from 'react-table';

export const DATA: DataObject[] = [{
    name: 'Agent Portal',
    type: {
        options: ['Agent tool', 'Online store'],
        selected: 'Agent tool'
    },
    typeOfTool: {
        options: ['Tool 1', 'Tool 2', 'Tool 3'],
        selected: ['Tool 1']
    },
    extReference: 'QA52562',
    active: true
},{
    name: 'Linkon Portal',
    type: {
        options: ['Agent tool', 'Online store'],
        selected: 'Agent tool'
    },
    typeOfTool: {
        options: ['Tool 1', 'Tool 2', 'Tool 3'],
        selected: ['Tool 2']
    },
    extReference: 'QA525621',
    active: true
},{
    name: 'Online store',
    type: {
        options: ['Agent tool', 'Online store'],
        selected: 'Online store'
    },
    typeOfTool: {
        options: ['Tool 1', 'Tool 2', 'Tool 3'],
        selected: ['Tool 2', 'Tool 3']
    },
    extReference: 'AS0012',
    active: false
}];

export const COLUMNS: Column<DataObject>[] = [
    {
        Header: 'Name',
        accessor: 'name' as keyof DataObject,
        Cell: (props: CellProps<DataObject>) => (<TextInput props={props} accessor={'name'} />)
    },
    {
        Header: 'Type',
        accessor: 'type' as keyof DataObject,
        Cell: (props: CellProps<DataObject>) => (<Dropdown props={props} accessor={'type'} />)
    },
    {
        Header: 'Type of tool',
        accessor: 'typeOfTool' as keyof DataObject,
        Cell: (props: CellProps<DataObject>) => (<MultiSelect props={props} accessor={'typeOfTool'} />)
    },
    {
        Header: 'External Reference',
        accessor: 'extReference' as keyof DataObject,
        Cell: (props: CellProps<DataObject>) => (<TextInput props={props} accessor={'extReference'} />)
    },
    {
        Header: 'Active',
        accessor: 'active' as keyof DataObject,
        Cell: (props: CellProps<DataObject>) => (<ActiveCheckbox props={props} accessor={'active'} />)
    }
]
