import { useTable, useRowSelect, Row } from 'react-table';
import { useMemo, useState } from 'react';
import { COLUMNS, DATA } from '../utils/consts';
import { SingleRow } from './SingleRow';
import { DataObject, FormDataObject } from '../utils/types';
import { CellEdit } from './CellEdit';
import { TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';
import { Form } from 'react-final-form';

const Table = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState<DataObject[]>(DATA);
    const [originalData, setOriginalData] = useState<DataObject[]>(DATA);
    const [submittedFieldId, setSubmittedFieldId] = useState<number | null>(null);

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

    const onSubmit = (data: FormDataObject) => {
        // api call
        setData((prevState) => prevState.map((obj, index) => {
            if (index === submittedFieldId) {
                return {
                    ...obj,
                    name: data.name,
                    extReference: data.extReference,
                    active: data.active,
                    typeOfTool: {
                        options: obj.typeOfTool.options,
                        selected: data.typeOfTool
                    },
                    type: {
                        options: obj.type.options,
                        selected: data.type,
                    }
                }
            }
            return obj;
        }))
    };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useRowSelect, (hooks) => {
        hooks.visibleColumns.push((columns) => (
            [{
                id: 'selection',
                Header: () => (<Checkbox />),
                Cell: () => (<Checkbox />)
            },
            ...columns,
            {
                id: 'edit-row-button',
                Cell: ({ row }: { row: Row<DataObject>}) => (<TableCell align="right" sx={{'width': '200px', 'border': 'none'}}><CellEdit {...row.getToggleRowSelectedProps()} row={row} revertData={revertData} setFieldId={setSubmittedFieldId}/></TableCell>)
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
                                        return <SingleRow row={row} key={i} />
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
