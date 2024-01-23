/* eslint-disable react-refresh/only-export-components */
import {
    Button,
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
    Dropdown,
    Checkbox,
    AutoModalProvider,
    AutoModalRender,
    useAutoModal,
    VirtualList,
} from '@react/components';
import { lazy, useRef, useState } from 'react';
import { ConfigProvider, Select, theme as antdTheme, Button as AntdButton } from 'antd';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DownloadOutlined } from '@ant-design/icons';
import { tableData } from './tableData';
import { treeData } from './treeData';
import useColumns from './useColumns';
import classNames from 'classnames';
import useFps from './useFps';
import { useNavigate } from 'react-router-dom';

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

const modals = {
    modal1: lazy(() => import('./Modal1')),
    modal2: lazy(() => import('./Modal2')),
    modal3: lazy(() => import('./Modal3')),
} as const;

type Modals = typeof modals;

const DemoTable = () => {
    useFps();
    const n = useNavigate();
    const btnRef = useRef(null);
    const columns = useColumns();
    const [count, setCount] = useState(100);
    const tableRef = useRef<TableRef>(null);
    const [empty, setEmpty] = useState(false);
    const { openModal } = useAutoModal<Modals>();

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(false);
    const [expandable, setExpandable] = useState(true);
    const [renderConf, setRenderConf] = useState(false);
    const tableConfRef = useRef<TableColumnConfRef>(null);
    const [rowSelection, setRowSelection] = useState(true);
    const { theme, themeClassName, applyClassName, applyBgClassName, setTheme } = useTheme();

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
        <ConfigProvider theme={{ token: { borderRadius: 2 }, algorithm: theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm }}>
            <div className={classNames(themeClassName, applyClassName, applyBgClassName)} style={{ width: '100%', height: '100%' }}>
                <div style={{ padding: 64 }}>
                    <VirtualTree
                        multipleSelect
                        data={treeData}
                        select="checkbox"
                        loading={loading}
                        wrapperStyle={{ width: 300, height: 200 }}
                        fieldKeys={{ key: 'id', label: 'nodeName', children: 'childList' }}
                        style={{ border: '1px solid var(--theme-border)', borderRadius: 2 }}
                        shouldSelectedKeysChange={(v) => {
                            const canDo = v.length > 0;
                            if (!canDo) notification.error({ message: '至少保留一位' });
                            return canDo;
                        }}
                    />

                    <VirtualList
                        multipleSelect
                        select="checkbox"
                        loading={loading}
                        data={treeData[0].childList[5].childList as any}
                        wrapperStyle={{ width: 300, height: 200, marginTop: 8 }}
                        fieldKeys={{ key: 'id', label: 'nodeName' }}
                        style={{ border: '1px solid var(--theme-border)', borderRadius: 2 }}
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
                        <Checkbox>ABC</Checkbox>
                        <AntdButton icon={<DownloadOutlined />} disabled type="primary" danger loading={loading} onClick={scroll}>
                            Scroll
                        </AntdButton>
                        <Button icon={<DownloadOutlined />} type="danger" loading={loading} onClick={() => n('/Page2')} shape="circle">
                            Scroll
                        </Button>
                        <Button icon={<DownloadOutlined />} type="danger" loading={loading} onClick={() => n('/Page1/Detail')} shape="circle">
                            Scroll
                        </Button>
                        <Button icon={<DownloadOutlined />} shape="circle" loading={loading}>
                            {null}
                        </Button>
                        <Button icon={<DownloadOutlined />} loading={loading}>
                            {null}
                        </Button>
                        <Button onClick={() => setLoading((e) => !e)}>Loading</Button>
                        <Button type="primary" onClick={() => setEmpty((e) => !e)}>
                            Empty
                        </Button>
                        <Button type="danger" onClick={reload}>
                            Count
                        </Button>
                        <Button type="primary" ghost onClick={changeTheme}>
                            Theme
                        </Button>
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
                                // notification.warning({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                                // notification.info({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                                // notification.success({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                                // notification.open({ message: '123123123123123123123123123123123123123123123123123123123123123' });
                            }}
                        >
                            notification
                        </Button>
                        <Button onClick={() => console.log(tableRef.current?.getInstance())}>showTable</Button>
                        <Dropdown
                            // visible
                            // placement="topRight"
                            items={[
                                {
                                    key: '1',
                                    label: 'label11111111111111',
                                    onClick: (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        return false;
                                    },
                                },
                                { label: 'label222222222222', key: '2' },
                            ]}
                        >
                            <Button
                                style={{
                                    position: 'fixed',
                                    bottom: 24,
                                    right: 24,
                                }}
                                ref={btnRef}
                            >
                                Dropdown
                            </Button>
                        </Dropdown>
                        <Select
                            style={{
                                width: 85,
                                // position: 'fixed',
                                // bottom: 24,
                                // right: 24,
                            }}
                            options={[
                                { label: '1111', value: '1' },
                                { label: '2222', value: '2' },
                            ]}
                        />
                        <Button
                            onClick={() => {
                                openModal('modal3', { c: 13 });
                            }}
                        >
                            Modal
                        </Button>
                    </div>

                    <div style={{ height: 600, width: 900, padding: 24 }}>
                        <Table
                            showIndex
                            rowKey="id"
                            ref={tableRef}
                            pagination={pagination}
                            expandable={expandable}
                            rowSelection={rowSelection ? { getCheckboxProps: (item) => ({ disabled: item.id === '1' }) } : false}
                            loading={query.isFetching || loading}
                            dataSource={empty ? undefined : tableData}
                            columns={columns}
                            onResizeEnd={(widths) => {
                                console.log(widths);
                            }}
                        />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ThemeHoc(() => {
    return (
        <AutoModalProvider modals={modals}>
            <DemoTable />
            <AutoModalRender />
        </AutoModalProvider>
    );
});