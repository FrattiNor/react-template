/* eslint-disable react-refresh/only-export-components */
import {
    Button,
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
    useAutoModal,
    VirtualList,
    QueryProvider,
    useQuery,
    Segmented,
    ThemeProvider,
    AntdThemeProvider,
    initFps,
} from '@react/components';
import { Fragment, lazy, useRef, useState } from 'react';
import { Select, Button as AntdButton, Skeleton } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { treeData } from './treeData';
import useColumns from './useColumns';
import classNames from 'classnames';

initFps();

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
    const { themeClassName, applyClassNameWithBg, setTheme } = useTheme();

    const query = useQuery({
        delay: 400,
        queryKey: ['DemoTable', count],
        queryFn: () => {
            return Promise.resolve(
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
        },
    });

    // useQuery({
    //     delay: 500,
    //     queryKey: ['DemoTable', count],
    //     queryFn: () => {
    //         console.log('count2', count);
    //         return Promise.resolve(
    //             Array(count)
    //                 .fill('')
    //                 .map((_, i) => ({
    //                     id: `${i}`,
    //                     age: Math.floor(Math.random() * 100),
    //                     name: `AAA_${i}`,
    //                     children: [
    //                         {
    //                             id: `children_${i}`,
    //                         },
    //                     ],
    //                 })),
    //         );
    //     },
    // });

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
        <Fragment>
            {query.firstLoading ? (
                <Skeleton />
            ) : (
                <div
                    className={classNames(themeClassName, applyClassNameWithBg)}
                    style={{
                        width: '100%',
                        height: '100%',
                        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
                    }}
                >
                    <div style={{ padding: 64, display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <Segmented
                            options={[
                                { label: '实时', value: 'realtime' },
                                { label: '搁置配置xxxxxxxxxxx', value: 'shelve' },
                            ]}
                        />
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
                            <Checkbox disabled checked></Checkbox>
                            <Checkbox disabled checked>
                                ABC
                            </Checkbox>
                            <Checkbox>ABC</Checkbox>
                            <AntdButton icon={<DownloadOutlined />} disabled type="primary" danger loading={loading} onClick={scroll}>
                                Scroll
                            </AntdButton>
                            <Button icon={<DownloadOutlined />} disabled type="primary" loading={loading} onClick={scroll}>
                                Scroll
                            </Button>
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
                                loading={query.loading || loading}
                                dataSource={empty ? undefined : query.data}
                                columns={columns}
                                onResizeEnd={(widths) => {
                                    console.log(widths);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default () => {
    return (
        <ThemeProvider>
            <AntdThemeProvider>
                <QueryProvider>
                    <AutoModalProvider modals={modals} autoRender>
                        <DemoTable />
                    </AutoModalProvider>
                </QueryProvider>
            </AntdThemeProvider>
        </ThemeProvider>
    );
};
