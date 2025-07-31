import { useRef } from 'react';

const useTableDomRef = () => {
	const bodyRef = useRef<HTMLDivElement | null>(null);
	const headRef = useRef<HTMLDivElement | null>(null);
	return { bodyRef, headRef };
};

export default useTableDomRef;
