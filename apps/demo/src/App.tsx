import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Column, TableRef } from '@pkg/table/src/type';
import Table from '@pkg/table/src/index';
import { useRef, useState } from 'react';
import { Switch, Button } from 'antd';
import useFps from './useFps';

type Item = {
    id: string;
    age: number;
    name: string;
};

const columns2: Column<Item>[] = Array(3)
    .fill('')
    .map((_, i) => ({
        width: Math.max(Math.floor(Math.random() * 150), 50),
        key: `age_${i}`,
        title: `年龄_${i}`,
        // flexGrow: i !== 0 ? 1 : 0,
        render: ({ age }) => `年龄_${age}`,
        fixed: i === 0 ? 'left' : i === 99 ? 'right' : undefined,
    }));

console.log(columns2.map((item) => item.width));

const DemoTable = () => {
    useFps();
    const ref = useRef<TableRef>(null);
    const [count, setCount] = useState(100000);
    const [loading, setLoading] = useState(false);

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
                }, 2000);
            });
        },
    });

    const scroll = () => {
        ref.current?.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
    };

    const reload = () => {
        setCount((c) => (c === 100 ? 10 : 100));
    };

    return (
        <div style={{ padding: 64 }}>
            <div style={{ padding: '24px 24px 0 24px', width: 900, backgroundColor: '#fff' }}>
                <Switch checked={loading} onChange={setLoading} />
                <Button onClick={scroll} style={{ marginLeft: 16 }}>
                    ScrollTo
                </Button>
                <Button onClick={reload} style={{ marginLeft: 16 }}>
                    Reload
                </Button>
            </div>
            <div style={{ height: 600, width: 900, padding: 24, backgroundColor: '#fff' }}>
                <Table ref={ref} rowKey="id" dataSource={query.data} columns={columns2} loading={query.isFetching || loading} />
            </div>
        </div>
    );
};

export default DemoTable;
