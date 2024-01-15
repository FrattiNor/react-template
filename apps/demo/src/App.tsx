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
    VirtualTree,
} from '@react/components';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, ConfigProvider, Select, theme as antdTheme } from 'antd';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import useFps from './useFps';
import { treeData } from './treeData';
import useColumns from './useColumns';
import { tableData } from './tableData';

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
    const columns = useColumns();
    const tableRef = useRef<TableRef>(null);
    const [empty, setEmpty] = useState(false);
    const [count, setCount] = useState(100);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState(false);
    const [expandable, setExpandable] = useState(true);
    const [renderConf, setRenderConf] = useState(false);
    const tableConfRef = useRef<TableColumnConfRef>(null);
    const [rowSelection, setRowSelection] = useState(true);
    const { theme, themeClassName, applyClassName, setTheme } = useTheme();

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

    const changeTheme = () => {
        setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    };

    return (
        <ConfigProvider theme={{ algorithm: theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm }}>
            <div className={classNames(themeClassName, applyClassName)} style={{ width: '100%', height: '100%' }}>
                <div style={{ padding: 64 }}>
                    <VirtualTree
                        multipleSelect
                        data={treeData}
                        select="checkbox"
                        loading={loading}
                        wrapperStyle={{ width: 300, height: 200 }}
                        fieldKeys={{ key: 'id', label: 'nodeName', children: 'childList' }}
                        style={{ border: '1px solid var(--theme-border)', borderRadius: 2, paddingLeft: 6 }}
                        shouldSelectedKeysChange={(v) => {
                            const canDo = v.length > 0;
                            if (!canDo) notification.error({ message: '至少保留一位' });
                            return canDo;
                        }}
                    />

                    <div style={{ width: 900, padding: '0 24px' }}>
                        {renderConf && (
                            <TableColumnsConf
                                ref={tableConfRef}
                                columns={getTableConfColumns(tableRef.current?.getInstance() as any)}
                                defaultColumns={getDefaultTableConfColumns(tableRef.current?.getInstance() as any)}
                                setColumnsConf={tableRef.current?.getInstance().setColumnsConf as any}
                            />
                        )}
                    </div>

                    <div style={{ padding: '24px 24px 0 24px', width: 900, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        <Button onClick={scroll}>Scroll</Button>
                        <Button onClick={() => setLoading((e) => !e)}>Loading</Button>
                        <Button onClick={() => setEmpty((e) => !e)}>Empty</Button>
                        <Button onClick={reload}>Count</Button>
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
                        <Button onClick={() => console.log(tableRef.current?.getInstance())}>showTable</Button>
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
                            debug
                            showIndex
                            rowKey="id"
                            ref={tableRef}
                            virtual="vertical"
                            pagination={pagination}
                            expandable={expandable}
                            rowSelection={rowSelection ? { getCheckboxProps: (item) => ({ disabled: item.id === '1' }) } : false}
                            loading={query.isFetching || loading}
                            dataSource={empty ? undefined : tableData}
                            columns={columns}
                            onResizeEnd={() => {
                                console.log(tableRef.current?.getInstance().horizontalItemSizeCache);
                            }}
                        />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ThemeHoc(DemoTable);
