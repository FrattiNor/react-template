import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Column, TableRef } from '@pkg/table/src/type';
import Table from '@pkg/table/src/index';
import { useRef, useState } from 'react';
import { Switch, Button } from 'antd';

type Item = {
    id: string;
    age: number;
    name: string;
};

const columns: Column<Item>[] = [
    {
        width: 50,
        fixed: 'left',
        key: 'age',
        title: '年龄xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        render: () =>
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    {
        width: 60,
        fixed: 'left',
        title: '姓名',
        key: 'name',
        align: 'center',
    },
    {
        width: 70,
        title: '年龄2',
        key: 'age2',
    },
    {
        width: 800,
        title: '姓名2',
        key: 'name2',
    },
    {
        width: 800,
        title: '年龄3',
        key: 'age3',
    },
    // {
    //     width: 200,
    //     title: '姓名3',
    //     key: 'name3',
    // },
    {
        title: '年龄4',
        key: 'age4',
        fixed: 'right',
        width: 60,
    },
    {
        title: '姓名4',
        key: 'name4',
        fixed: 'right',
        width: 50,
    },
    // {
    //     title: '年龄5',
    //     key: 'age5',
    //     fixed: 'right',
    //     width: 50,
    // },
    // {
    //     title: '姓名5',
    //     key: 'name5',
    // },
    // {
    //     title: '年龄6',
    //     key: 'age6',
    // },
    // {
    //     title: '姓名6',
    //     key: 'name6',
    // },
    // {
    //     title: '年龄7',
    //     key: 'age7',
    // },
    // {
    //     title: '姓名7',
    //     key: 'name7',
    // },
    // {
    //     title: '年龄8',
    //     key: 'age8',
    // },
    // {
    //     title: '姓名8',
    //     key: 'name8',
    // },
    // {
    //     title: '年龄9',
    //     key: 'age9',
    // },
    // {
    //     title: '姓名9',
    //     key: 'name9',
    // },
    // {
    //     title: '年龄10',
    //     key: 'age10',
    // },
    // {
    //     title: '姓名10',
    //     key: 'name10',
    // },
];

const DemoTable = () => {
    const ref = useRef<TableRef>(null);
    const [count, setCount] = useState(100);
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

    console.log(query.data);

    const onClick = () => {
        setCount((c) => (c === 100 ? 1000 : 100));
    };

    return (
        <div style={{ padding: 64 }}>
            <div style={{ padding: '24px 24px 0 24px', width: 900, backgroundColor: '#fff' }}>
                <Switch checked={loading} onChange={setLoading} />
                <Button onClick={onClick} style={{ marginLeft: 16 }}>
                    ScrollTo
                </Button>
            </div>
            <div style={{ height: 600, width: 900, padding: 24, backgroundColor: '#fff' }}>
                <Table ref={ref} rowKey="id" dataSource={query.data} columns={columns} loading={query.isFetching || loading} />
            </div>
        </div>
    );
};

export default DemoTable;
