import { useEffect, useRef } from 'react';

const useTableDomRef = () => {
	const bodyRef = useRef<HTMLDivElement | null>(null);
	const headRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (bodyRef.current && headRef.current) {
			const bodyScroll = () => {
				const bodyScrollLeft = bodyRef.current?.scrollLeft;
				const headScrollLeft = headRef.current?.scrollLeft;
				if (typeof bodyScrollLeft === 'number' && typeof headScrollLeft === 'number' && bodyScrollLeft !== headScrollLeft) {
					if (headRef.current) {
						headRef.current.scrollLeft = bodyScrollLeft;
					}
				}
			};

			bodyRef.current.addEventListener('scroll', bodyScroll, { passive: true });

			return () => {
				bodyRef.current?.removeEventListener('scroll', bodyScroll);
			};
		}
	}, []);

	return { bodyRef, headRef };
};

export default useTableDomRef;
