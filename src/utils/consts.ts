import { DataObject } from '../utils/types';

export const DATA: DataObject[] = [{
    name: 'name1',
    type: 'type1',
    typeOfTool: 'tool1',
    extReference: 'ref1',
    active: 'true'
},{
    name: 'name2',
    type: 'type2',
    typeOfTool: 'tool2',
    extReference: 'ref2',
    active: 'true'
},{
    name: 'name3',
    type: 'type3',
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
        accessor: 'type' as keyof DataObject
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
