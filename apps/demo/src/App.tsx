import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Table, { TableRef, TableTheme } from '@pkg/table';
import { useMemo, useRef, useState } from 'react';
import { columns, columns2 } from './utils';
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
    const ref = useRef<TableRef>(null);
    const [empty, setEmpty] = useState(false);
    const [count, setCount] = useState(10000);
    const [loading, setLoading] = useState(false);
    const [columnsFlag, setColumnsFlag] = useState(1);
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
        ref.current?.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
    };

    const reload = () => {
        setCount((c) => (c === 100 ? 5 : 100));
    };

    const height = () => {
        setColumnsFlag((f) => f + 1);
    };

    const changeTheme = () => {
        setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    };

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
                </div>
                <div style={{ height: 400, width: 900, padding: 24 }}>
                    <Table
                        ref={ref}
                        rowKey="id"
                        theme={theme}
                        calcRowHeight={90}
                        pagination={{ total: 100 }}
                        loading={query.isFetching || loading}
                        dataSource={empty ? [] : query.data || []}
                        columns={(columnsMap as any)[`${columnsFlag % 3}` as any] as any}
                        rowSelection={{
                            fixed: 'left',
                            getCheckboxProps: (record) => {
                                return {
                                    disabled: record.id === '1',
                                };
                            },
                        }}
                        expandable={{
                            fixed: 'left',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DemoTable;
