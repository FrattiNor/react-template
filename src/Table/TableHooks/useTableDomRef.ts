import { useRef } from 'react';

const useTableDomRef = () => {
	const bodyRef = useRef<HTMLDivElement | null>(null);
	const headRef = useRef<HTMLDivElement | null>(null);
	const tableRef = useRef<HTMLDivElement | null>(null);

	return { bodyRef, headRef, tableRef };
};

export default useTableDomRef;
