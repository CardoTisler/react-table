import { DataObject } from '../utils/types';
import { Dropdown } from '../components/Dropdown';
import { MultiSelect } from '../components/MultiSelect';
import { TextInput } from '../components/TextField';
import { ActiveCheckbox } from '../components/ActiveCheckbox';

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

export const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name' as keyof DataObject,
        Cell: (props: any) => (<TextInput row={props.row} accessor={'name'} active={props.active} updateData={props.meta.updateData}/>)
    },
    {
        Header: 'Type',
        accessor: 'type' as keyof DataObject,
        Cell: (props: any) => (<Dropdown row={props.row} accessor={'type'} active={props.active} updateData={props.meta.updateData}/>)
    },
    {
        Header: 'Type of tool',
        accessor: 'typeOfTool' as keyof DataObject,
        Cell: (props: any) => (<MultiSelect row={props.row} accessor={'typeOfTool'} active={props.active} updateData={props.meta.updateData}/>)
    },
    {
        Header: 'External Reference',
        accessor: 'extReference' as keyof DataObject,
        Cell: (props: any) => (<TextInput row={props.row} accessor={'extReference'} active={props.active} updateData={props.meta.updateData}/>)
    },
    {
        Header: 'Active',
        accessor: 'active' as keyof DataObject,
        Cell: (props: any) => (<ActiveCheckbox row={props.row} accessor={'active'} active={props.active} props={props} updateData={props.meta.updateData}/>)
    }
]
