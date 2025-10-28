import { useEffect, useRef } from 'react';

// 表格dom的ref
const useTableDomRef = () => {
	const bodyRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (bodyRef.current && headRef.current) {
			const body = bodyRef.current;
			const head = headRef.current;
			const handleBodyScroll = () => {
				if (head.scrollLeft !== body.scrollLeft) {
					head.scrollLeft = body.scrollLeft;
				}
			};
			body.addEventListener('scroll', handleBodyScroll, { passive: true });

			return () => {
				body.removeEventListener('scroll', handleBodyScroll);
			};
		}
	}, []);

	return { bodyRef, headRef };
};

export default useTableDomRef;
