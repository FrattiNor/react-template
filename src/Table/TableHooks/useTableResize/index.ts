import { startTransition, useEffect } from 'react';
import type useTableState from '../useTableState';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

// 表头resize
const useTableResize = ({ tableState }: Props) => {
	const { resizeFlag, setResizeFlag, setColumnSizes } = tableState;

	useEffect(() => {
		if (resizeFlag) {
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				const moveX = e.pageX - resizeFlag.pageX;
				const nextWidth = Math.min(1500, Math.max(50, moveX + resizeFlag.clientWidth));
				startTransition(() => {
					setColumnSizes((old) => ({
						...old,
						[resizeFlag.key]: nextWidth,
					}));
				});
			};

			const mouseUp = (e: MouseEvent) => {
				pauseEvent(e);
				setResizeFlag(null);
			};

			document.addEventListener('mouseup', mouseUp);
			document.addEventListener('mousemove', mouseMove);

			return () => {
				document.removeEventListener('mouseup', mouseUp);
				document.removeEventListener('mousemove', mouseMove);
			};
		}
	}, [resizeFlag]);

	const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
		pauseEvent(e as unknown as Event);
		const oldSize = tableState.columnSizes[key] ?? 0;
		const pageX = e.pageX;
		setResizeFlag({ key, pageX, clientWidth: oldSize });
	};

	const resizeKey = resizeFlag?.key;

	return { startResize, resizeKey };
};

export default useTableResize;
