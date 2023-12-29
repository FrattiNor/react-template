/* eslint-disable react-refresh/only-export-components */
import Table, { TableTheme, useTableDataContext, TableDataContextHoc } from '@pkg/table';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { columns, columns2 } from './utils';
import { useMemo, useState } from 'react';
import styles from './App.module.less';
import { Button } from 'antd';
import useFps from './useFps';

type Item = {
    id: string;
    age: number;
    name: string;
};

const DemoTable = () => {
    useFps();
    const dataContext = useTableDataContext();
    const [empty, setEmpty] = useState(false);
    const [count, setCount] = useState(50000);
    const [loading, setLoading] = useState(false);
    const [columnsFlag, setColumnsFlag] = useState(1);
    const [pagination, setPagination] = useState(true);
    const [expandable, setExpandable] = useState(false);
    const [rowSelection, setRowSelection] = useState(false);
    const [theme, setTheme] = useState<TableTheme>('light');

    const columns3: any[] = useMemo(() => {
        return Array(100)
            .fill('')
            .map((_, i) => ({
                key: `age_${i}`,
                title: `年龄_${i}`,
                fixed: i === 0 ? 'left' : i === 99 ? 'right' : undefined,
                width: Math.max(Math.floor(Math.random() * 150), 50),
            }));
    }, []);

    const columnsMap = {
        0: columns,
        1: columns2,
        2: columns3,
    };

    const query = useQuery({
        gcTime: 0,
        staleTime: 0,
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        queryKey: ['DemoTable', count],
        queryFn: () => {
            return new Promise<Item[]>((res) => {
                setTimeout(() => {
                    res(
                        Array(count)
                            .fill('')
                            .map((_, i) => ({
                                id: `${i}`,
                                age: Math.floor(Math.random() * 100),
                                name: `AAA_${i}`,
                                children: [
                                    {
                                        id: `children_${i}`,
                                    },
                                ],
                            })),
                    );
                }, 400);
            });
        },
    });

    const scroll = () => {
        dataContext.tableRef.current?.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
    };

    const reload = () => {
        setCount((c) => (c === 5 ? 50000 : 5));
    };

    const height = () => {
        setColumnsFlag((f) => f + 1);
    };

    const changeTheme = () => {
        setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    };

    // console.log(dataContext);

    return (
        <div className={styles[theme]} style={{ width: '100%', height: '100%' }}>
            <div style={{ padding: 64 }}>
                <div style={{ padding: '24px 24px 0 24px', width: 900 }}>
                    <Button onClick={scroll}>Scroll</Button>
                    <Button onClick={() => setLoading((e) => !e)} style={{ marginLeft: 16 }}>
                        Loading
                    </Button>
                    <Button onClick={() => setEmpty((e) => !e)} style={{ marginLeft: 16 }}>
                        Empty
                    </Button>
                    <Button onClick={reload} style={{ marginLeft: 16 }}>
                        Count
                    </Button>
                    <Button onClick={height} style={{ marginLeft: 16 }}>
                        Columns
                    </Button>
                    <Button onClick={changeTheme} style={{ marginLeft: 16 }}>
                        Theme
                    </Button>
                    <Button onClick={() => setPagination((v) => !v)} style={{ marginLeft: 16 }}>
                        pagination
                    </Button>
                    <Button onClick={() => setExpandable((v) => !v)} style={{ marginLeft: 16 }}>
                        expandable
                    </Button>
                    <Button onClick={() => setRowSelection((v) => !v)} style={{ marginLeft: 16 }}>
                        rowSelection
                    </Button>
                </div>
                <div style={{ height: 400, width: 900, padding: 24 }}>
                    <Table
                        rowKey="id"
                        theme={theme}
                        calcRowHeight={90}
                        pagination={pagination}
                        expandable={expandable}
                        rowSelection={rowSelection}
                        loading={query.isFetching || loading}
                        dataSource={empty ? undefined : query.data}
                        columns={(columnsMap as any)[`${columnsFlag % 3}` as any] as any}
                    />
                </div>
            </div>
        </div>
    );
};

export default TableDataContextHoc(DemoTable);
