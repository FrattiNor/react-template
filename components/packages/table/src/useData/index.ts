import { TableColumnsConfItem, TableRef } from '../type';
import { useRef, useState } from 'react';

const useData = () => {
    const tableRef = useRef<TableRef>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    // const [indexConf, setIndexConf] = useState<Record<string, number>>({});
    // const [widthConf, setWidthConf] = useState<Record<string, number>>({});
    // const [hiddenConf, setHiddenConf] = useState<Record<string, boolean>>({});
    // const [fixedConf, setFixedConf] = useState<Record<string, TableFixed>>({});
    const [columnsConf, setColumnsConf] = useState<Record<string, TableColumnsConfItem>>({});

    return {
        bodyRef,
        headRef,
        tableRef,
        expandedRowKeys,
        setExpandedRowKeys,
        selectedRowKeys,
        setSelectedRowKeys,
        columnsConf,
        setColumnsConf,
    };
};

export default useData;
