import { useTable, useRowSelect } from 'react-table';
import { useMemo, useState } from 'react';
import { COLUMNS, DATA } from '../utils/consts';
import { Checkbox } from '../components/Checkbox';
import { SingleRow } from './SingleRow';
import { DataObject } from '../utils/types';
import { CellEdit } from './CellEdit';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Form } from 'react-final-form';

// mini README
// !----!
// There is a bug when selecting values, for some reason the table re-renders twice, therefore somehow losing the
// data stored in `selectedFlatRows`, which is what I'm using to keep track of active rows.
// !----!
// Also a bunch of ts-ignore tags because the type packages don't seem to be up-to-date, I think?
// !----!
// Trying to submit multiple rows at once is bugged because react-final-form only looks at the
// name attribute and since I used the accessor key for them then always the last row gets submitted.
// I guess one workaround would be to either append row-index to the name or simply not allow editing
// multiple rows at once.
// !----!

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
    const onSubmit = (e: any) => {
        // api call
        console.log(e)
    };
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
                    Cell: ({ row }) => (<TableCell align="right" sx={{'width': '200px', 'border': 'none'}}><CellEdit {...row.getToggleRowSelectedProps()} row={row} setEditedRows={setEditedRows} revertData={revertData} onSubmit={onSubmit}/></TableCell>)
                }]
    ))
    });

    return (
        <Form onSubmit={onSubmit}
        render={({handleSubmit}) => (
            <>
                <form onSubmit={handleSubmit} noValidate>
                <table {...getTableProps()} cellSpacing={0}>
                    <TableHead sx={{'backgroundColor': 'whitesmoke', 'padding': '0'}}>
                        {
                            headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps()} sx={{height: '30px'}}>
                                    {
                                        headerGroup.headers.map((col, index) => (
                                            <TableCell sx={index === 0 ? { padding: '0px 16px 0px 16px'} : {minWidth: '180px', padding: '0px 16px 0px 16px'}} align="left" {...col.getHeaderProps()}>{col.render('Header')}</TableCell>
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
                </form>
            </>
        )}
        />)
}

export default Table;
