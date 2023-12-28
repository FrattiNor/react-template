import { useRef, useState } from 'react';
import { TableRef } from '../type';

const useData = () => {
    const tableRef = useRef<TableRef>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

    return {
        bodyRef,
        headRef,
        tableRef,
        expandedRowKeys,
        setExpandedRowKeys,
        selectedRowKeys,
        setSelectedRowKeys,
    };
};

export default useData;
