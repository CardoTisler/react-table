import { useTable, useRowSelect } from 'react-table';
import { useMemo } from 'react';
import { COLUMNS, DATA } from '../utils/consts';
import { Checkbox } from '../components/Checkbox';
const Table = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // @ts-ignore
        selectedFlatRows,
    } = useTable({ columns, data }, useRowSelect, (hooks) => {
        // visibleColumns defines the columns we see in browser
        hooks.visibleColumns.push((columns) => (
            [{
                id: 'selection',
                // @ts-ignore
                Header: ({ getToggleAllRowsSelectedProps }) => (<Checkbox {...getToggleAllRowsSelectedProps()}/>),
                // @ts-ignore
                Cell: ({ row }) => (<Checkbox {...row.getToggleRowSelectedProps()} />)
            },
            ...columns]
    ))
    });

    return (
        <>
        <table {...getTableProps()}>
            <thead>
            {
                headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((col) => (
                                <th {...col.getHeaderProps()}>{col.render('Header')}</th>
                            ))
                        }
                    </tr>
                ))
            }
            </thead>
            <tbody {...getTableBodyProps()}>
            {
                rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
            {JSON.stringify(
                {
                    selectedFlatRows: selectedFlatRows.map((row: any) => row.original)
            }, null, 4)
            }
        </>
    )
}

export default Table;
