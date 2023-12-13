import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { TableRef } from '@pkg/table/src/type';
import { columns, columns2 } from './utils';
import { useRef, useState } from 'react';
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
    const [count, setCount] = useState(1000);
    const [loading, setLoading] = useState(false);
    const [columnsFlag, setColumnsFlag] = useState(true);

    // const columns2: Column<Item>[] = useMemo(() => {
    //     return Array(22)
    //         .fill('')
    //         .map((_, i) => ({
    //             width: Math.max(Math.floor(Math.random() * 150), 50),
    //             key: `age_${i}`,
    //             title: `年龄_${i}`,
    //             flexGrow: i !== 0 ? 1 : 0,
    //             fixed: i === 0 ? 'left' : i === 10 ? 'right' : undefined,
    //             render: (__, index) => <span style={{ display: 'inline-block', lineHeight: `${lineHeight}px` }}>{`年龄_${index}`}</span>,
    //         }));
    // }, [lineHeight]);

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
        setColumnsFlag((f) => !f);
    };

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
                <div style={{ height: 300, width: 900, padding: 24 }}>
                    <Table
                        ref={ref}
                        rowKey="id"
                        dataSource={query.data || []}
                        loading={query.isFetching || loading}
                        columns={(columnsFlag ? columns : columns2) as any}
                        // rowSelection={{
                        //     getCheckboxProps: (_, index) => ({ disabled: index % 2 === 0 }),
                        // }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DemoTable;
