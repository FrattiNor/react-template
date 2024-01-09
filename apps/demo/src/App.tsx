/* eslint-disable react-refresh/only-export-components */
import {
    ThemeHoc,
    useTheme,
    TableColumnsConf,
    TableColumnConfRef,
    Table,
    NotificationClient,
    TableRef,
    getTableConfColumns,
    getDefaultTableConfColumns,
} from '@react/components';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, ConfigProvider, Select, theme as antdTheme } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { columns, columns2 } from './utils';
import classNames from 'classnames';
import useFps from './useFps';

type Item = {
    id: string;
    age: number;
    name: string;
};

const notification = new NotificationClient();

notification.setConfig({
    duration: 0,
    placement: 'topRight',
});

const DemoTable = () => {
    useFps();
    const tableRef = useRef<TableRef>(null);
    const [empty, setEmpty] = useState(false);
    const [count, setCount] = useState(50000);
    const [loading, setLoading] = useState(false);
    const [columnsFlag, setColumnsFlag] = useState(1);
    const [pagination, setPagination] = useState(true);
    const [expandable, setExpandable] = useState(true);
    const [renderConf, setRenderConf] = useState(false);
    const tableConfRef = useRef<TableColumnConfRef>(null);
    const [rowSelection, setRowSelection] = useState(true);
    const { theme, themeClassName, applyClassName, setTheme } = useTheme();

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
        tableRef.current?.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
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

    return (
        <ConfigProvider theme={{ token: { borderRadius: 2 }, algorithm: theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm }}>
            <div className={classNames(themeClassName, applyClassName)} style={{ width: '100%', height: '200%' }}>
                <div style={{ padding: 64 }}>
                    <div style={{ width: 900, padding: '0 24px' }}>
                        {renderConf && (
                            <TableColumnsConf
                                ref={tableConfRef}
                                columns={getTableConfColumns(tableRef.current?.getTableInstance() as any)}
                                defaultColumns={getDefaultTableConfColumns(tableRef.current?.getTableInstance() as any)}
                                setColumnsConf={tableRef.current?.getTableInstance().innerProps.setColumnsConf as any}
                            />
                        )}
                    </div>

                    <div style={{ padding: '24px 24px 0 24px', width: 900, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        <Button onClick={scroll}>Scroll</Button>
                        <Button onClick={() => setLoading((e) => !e)}>Loading</Button>
                        <Button onClick={() => setEmpty((e) => !e)}>Empty</Button>
                        <Button onClick={reload}>Count</Button>
                        <Button onClick={height}>Columns</Button>
                        <Button onClick={changeTheme}>Theme</Button>
                        <Button onClick={() => setPagination((v) => !v)}>pagination</Button>
                        <Button onClick={() => setExpandable((v) => !v)}>expandable</Button>
                        <Button onClick={() => setRowSelection((v) => !v)}>rowSelection</Button>
                        <Button onClick={() => setRenderConf((v) => !v)}>renderConf</Button>
                        <Button onClick={() => tableConfRef.current?.submit()}>Submit</Button>
                        <Button onClick={() => tableConfRef.current?.reset()}>Reset</Button>
                        <Button
                            onClick={() => {
                                notification.error({
                                    message:
                                        '123123123123123123123123123123123123123123123123123123123123123\n123123123123123123123123123123123123123123123123123123123123123',
                                });
                                notification.warning({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                                notification.info({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                                notification.success({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                                notification.open({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                            }}
                        >
                            notification
                        </Button>
                        <Button onClick={() => console.log(tableRef.current?.getTableInstance())}>showTable</Button>
                        <Select
                            open
                            style={{ width: 85 }}
                            options={[
                                { label: '1111', value: '1' },
                                { label: '2222', value: '2' },
                            ]}
                        />
                    </div>

                    <div style={{ height: 400, width: 900, padding: 24 }}>
                        <Table
                            showIndex
                            rowKey="id"
                            ref={tableRef}
                            pagination={pagination}
                            expandable={expandable}
                            rowSelection={rowSelection ? { getCheckboxProps: (item) => ({ disabled: item.id === '1' }) } : false}
                            loading={query.isFetching || loading}
                            dataSource={empty ? undefined : query.data}
                            columns={(columnsMap as any)[`${columnsFlag % 3}` as any] as any}
                            onResizeEnd={() => {
                                console.log(tableRef.current?.getTableInstance().innerProps.horizontalItemSizeCache);
                            }}
                        />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ThemeHoc(DemoTable);
