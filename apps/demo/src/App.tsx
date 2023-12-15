import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { TableRef } from '@pkg/table/src/type';
import { columns, columns2 } from './utils';
import Table from '@pkg/table/src/index';
import { Switch, Button } from 'antd';
import useFps from './useFps';

type Item = {
    id: string;
    age: number;
    name: string;
};

const DemoTable = () => {
    useFps();
    const ref = useRef<TableRef>(null);
    const [count, setCount] = useState(10000);
    const [loading, setLoading] = useState(false);
    const [columnsFlag, setColumnsFlag] = useState(1);

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
        setCount((c) => (c === 100 ? 10 : 100));
    };

    const height = () => {
        setColumnsFlag((f) => f + 1);
    };

    // useEffect(() => {
    //     if (query.data) {
    //         const start1 = new Date().valueOf();
    //         for (let i = 0; i < 10000; i++) {
    //             const res = [...(query.data || [])];
    //         }
    //         console.log('type1', new Date().valueOf() - start1);

    //         const start2 = new Date().valueOf();
    //         for (let i = 0; i < 10000; i++) {
    //             const res = [];
    //             res.push(...(query.data || []));
    //         }
    //         console.log('type2', new Date().valueOf() - start2);

    //         const obj: Record<string, any> = {};
    //         const start3 = new Date().valueOf();
    //         for (let i = 0; i < 10000; i++) {
    //             query.data.forEach((item) => {
    //                 obj[item.id] = item;
    //             });
    //         }
    //         console.log('type3', new Date().valueOf() - start3);

    //         const start4 = new Date().valueOf();
    //         for (let i = 0; i < 10000; i++) {
    //             const obj2 = { ...obj };
    //         }
    //         console.log('type4', new Date().valueOf() - start4);
    //     }
    // }, [query.data]);

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
            <div style={{ padding: 64 }}>
                <div style={{ padding: '24px 24px 0 24px', width: 900 }}>
                    <Switch checked={loading} onChange={setLoading} />
                    <Button onClick={scroll} style={{ marginLeft: 16 }}>
                        ScrollTo
                    </Button>
                    <Button onClick={reload} style={{ marginLeft: 16 }}>
                        Reload
                    </Button>
                    <Button onClick={height} style={{ marginLeft: 16 }}>
                        Columns
                    </Button>
                </div>
                <div style={{ height: 400, width: 900, padding: 24 }}>
                    <Table
                        ref={ref}
                        rowKey="id"
                        key={`${query.isFetching}`}
                        dataSource={query.data || []}
                        loading={query.isFetching || loading}
                        columns={(columnsMap as any)[`${columnsFlag % 3}` as any] as any}
                        rowSelection={{
                            fixed: false,
                        }}
                        expandable={{
                            fixed: false,
                            defaultExpandAllRows: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DemoTable;
