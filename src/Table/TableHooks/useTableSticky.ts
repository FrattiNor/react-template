/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type useTableDomRef from './useTableDomRef';
import type useTableState from './useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
};

// 表格左右固定
// @ts-ignore
const useTableSticky = ({ tableState }: Props) => {
	// const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);
	// useEffect(() => {
	// 	timeoutRef.current = setInterval(() => {
	// 		console.log('scrollLeft', tableState.pinged.current);
	// 	}, 500);
	// 	return () => {
	// 		if (timeoutRef.current) clearInterval(timeoutRef.current);
	// 	};
	// }, []);
};

export default useTableSticky;
