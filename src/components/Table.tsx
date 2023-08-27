import { useTable, useRowSelect, Row } from 'react-table';
import { useMemo, useState } from 'react';
import { COLUMNS, DATA } from '../utils/consts';
import { Checkbox } from '../components/Checkbox';
import { SingleRow } from './SingleRow';
import { DataObject } from '../utils/types';
import { CellEdit } from './CellEdit';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Form, Field } from 'react-final-form';

const Table = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState<DataObject[]>(DATA);
    const [originalData, setOriginalData] = useState<DataObject[]>(DATA);
    const [editedRows, setEditedRows] = useState({});

    const revertData = (rowIndex: number, revert: boolean) => {
        if (revert) {
            setData((prevData) =>
                prevData.map((row, index) =>
                    index === rowIndex ? originalData[rowIndex] : row
                )
            );
        } else {
            setOriginalData((prevData) =>
                prevData.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
            );
        }
    }

    const updateData = (rowIndex: number, accessor: keyof DataObject, value: string) => {
        setData((prevState) =>
            prevState.map((row, index) => {
                if (index == rowIndex) {
                    return {
                        ...prevState[rowIndex],
                        ...(typeof row[accessor] === 'string' || typeof row[accessor] === 'boolean' ? {
                            [accessor]: value
                        }: {
                            [accessor]: {
                                ...row[accessor] as unknown as object,
                                selected: value,
                            }
                        })
                    };
                }
                return row;
            })
        );
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // @ts-ignore
        selectedFlatRows,
        // @ts-ignore
    } = useTable({ columns, data, meta: { updateData, revertData } }, useRowSelect, (hooks) => {
        // visibleColumns defines the columns we see in browser
        hooks.visibleColumns.push((columns) => (
            [{
                id: 'selection',
                // @ts-ignore
                Header: ({ getToggleAllRowsSelectedProps }) => (<Checkbox {...getToggleAllRowsSelectedProps()}/>),
                // @ts-ignore
                Cell: ({ row }) => (<Checkbox {...row.getToggleRowSelectedProps()} />)
            },
            ...columns,
                {
                    id: 'edit-row-button',
                    // @ts-ignore
                    Cell: ({ row }) => (<TableCell align="right" sx={{'width': '200px', 'border': 'none'}}><CellEdit {...row.getToggleRowSelectedProps()} row={row} setEditedRows={setEditedRows} revertData={revertData}/></TableCell>)
                }]
    ))
    });

    return (
        <>
        <table {...getTableProps()}>
            <TableHead sx={{'backgroundColor': 'whitesmoke', 'padding': '0'}}>
            {
                headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((col) => (
                                <TableCell {...col.getHeaderProps()}>{col.render('Header')}</TableCell>
                            ))
                        }
                    </TableRow>
                ))
            }
            </TableHead>
            <TableBody {...getTableBodyProps()}>
            {
                rows.map((row, i) => {
                    prepareRow(row);
                    return <SingleRow row={row} key={i} selectedRows={selectedFlatRows} />
                })
            }
            </TableBody>
        </table>
        </>
    )
}

export default Table;
