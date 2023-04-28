/* eslint-disable react/jsx-key */

import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
// import type { ColumnOrderState } from '@tanstack/react-table';
import { makeData } from './makeData';
import classNames from 'classnames';
import { getTitle } from './utils';
import styles from './index.less';
import { Pagination } from 'antd';
import React from 'react';

type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
};

const columnHelper = createColumnHelper<Person>();

const defaultColumn: Partial<ColumnDef<Person>> = {
    maxSize: 1000,
    minSize: 100,
};

const columns = [
    columnHelper.group({
        header: 'Name',
        footer: () => 'Name F',
        columns: [
            columnHelper.accessor('firstName', {
                cell: (info) => info.getValue(),
                footer: () => 'firstName F',
                enableResizing: false,
                // columnPinning: "left",
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: 'lastName',
                cell: (info) => <i>{info.getValue()}</i>,
                header: () => 'Last Name',
                footer: () => 'lastName F',
            }),
        ],
    }),
    columnHelper.group({
        header: 'Info',
        footer: () => 'Info F',
        columns: [
            columnHelper.accessor('age', {
                header: () => 'Age',
                cell: (info) => info.renderValue(),
                footer: () => 'Age F',
            }),
            columnHelper.group({
                header: 'More Info',
                footer: () => 'More Info F',
                columns: [
                    columnHelper.accessor('visits', {
                        header: () => 'Visits',
                        footer: () => 'Visits F',
                    }),
                    columnHelper.accessor('status', {
                        header: 'Status',
                        footer: () => 'Status F',
                    }),
                    columnHelper.accessor('progress', {
                        header: 'Profile Progress',
                        size: 400,
                        footer: () => 'Progress F',
                    }),
                ],
            }),
        ],
    }),
];

const App = () => {
    const [data, setData] = React.useState(() => makeData(10000));
    const [columnVisibility, setColumnVisibility] = React.useState({});
    // const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

    const resetData = () => {
        setData(makeData(1000));
    };

    const table = useReactTable({
        data, // 数据源
        columns, // 列配置
        defaultColumn, // 默认列配置

        // === @pinning 列固定 ===
        enablePinning: true,

        // === @state 状态 ===
        state: {
            columnVisibility, //  列可见状态
            // columnOrder, // 列排序状态
        },

        // === @columnResize 宽变更 ===
        // enableResizing: true,
        columnResizeMode: 'onChange', // 列拖动排序触发方式

        // === @pagination 分页 ===
        // manualPagination: true, // 手动分页（服务端分页）
        // pageCount: -1 // 手动分页需要提供
        autoResetPageIndex: true, // data更新 过滤器改变 分组改变 主动重置index
        getPaginationRowModel: getPaginationRowModel(), // 启用分页模型

        // === @columnVisibility 列可见 ===
        onColumnVisibilityChange: setColumnVisibility,

        // === @columnOrder 列排序 ===
        // onColumnOrderChange: setColumnOrder,

        // === @core ===
        getCoreRowModel: getCoreRowModel(), // 启动核心模型

        // === @meta 额外赋予的函数 ===
        meta: {
            updateData: (rowIndex, columnId, value) => {
                console.log(rowIndex, columnId, value);
            },
        },
    });

    return (
        <div className={styles['container']}>
            <div>
                {table.getAllLeafColumns().map((column) => (
                    <div key={column.id}>
                        <label>
                            <input
                                {...{
                                    type: 'checkbox',
                                    checked: column.getIsVisible(),
                                    onChange: column.getToggleVisibilityHandler(),
                                }}
                            />
                            {column.id}
                        </label>
                    </div>
                ))}
            </div>

            <div onClick={resetData}>reset data</div>

            <div className={styles['wrapper']}>
                <div className={styles['table-wrapper']}>
                    <table {...{ style: { width: table.getTotalSize() } }}>
                        <colgroup>
                            {table.getAllLeafColumns().map((column) => (
                                <col key={column.id} width={column.getSize()} />
                            ))}
                        </colgroup>

                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        const value = header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext());
                                        const title = getTitle(value);
                                        return (
                                            <th title={title} key={header.id} colSpan={header.colSpan} style={{ textAlign: header.colSpan > 1 ? 'center' : 'left' }}>
                                                {value}
                                                {header.column.getCanResize() && (
                                                    <div onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} className={classNames(styles['resizer'], { [styles['isResizing']]: header.column.getIsResizing() })} />
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        const value = flexRender(cell.column.columnDef.cell, cell.getContext());
                                        const title = getTitle(value);
                                        return (
                                            <td title={title} key={cell.id}>
                                                {value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            {table.getFooterGroups().map((footerGroup) => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map((header) => {
                                        const value = header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext());
                                        const title = getTitle(value);
                                        return (
                                            <th title={title} key={header.id} colSpan={header.colSpan} style={{ textAlign: header.colSpan > 1 ? 'center' : 'left' }}>
                                                {value}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tfoot>
                    </table>
                </div>

                <div className={styles['pagination']}>
                    <Pagination
                        size="small"
                        showQuickJumper
                        total={data.length}
                        pageSizeOptions={[10, 20, 30, 40, 50, 100]}
                        onChange={(v) => table.setPageIndex(v - 1)}
                        onShowSizeChange={(_, size) => table.setPageSize(size)}
                        current={table.getState().pagination.pageIndex + 1}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
