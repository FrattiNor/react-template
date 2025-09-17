import { useRef } from 'react';

// 表格dom的ref
const useTableDomRef = () => {
	const bodyRef = useRef<HTMLDivElement | null>(null);
	const headRef = useRef<HTMLDivElement | null>(null);
	const tableRef = useRef<HTMLDivElement | null>(null);
	return { tableRef, bodyRef, headRef };
};

export default useTableDomRef;
