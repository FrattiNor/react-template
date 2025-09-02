import { useEffect, useState } from 'react';
import type useTableState from './useTableState';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

type ResizeStart = {
	key: string;
	pageX: number;
	clientWidth: number;
};

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

const useTableResize = ({ tableState }: Props) => {
	const [resizeStart, setResizeStart] = useState<ResizeStart | null>(null);

	useEffect(() => {
		if (resizeStart) {
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				const moveX = e.pageX - resizeStart.pageX;
				const nextWidth = Math.max(50, moveX + resizeStart.clientWidth);
				tableState.setColumnSizes((old) => ({
					...old,
					[resizeStart.key]: nextWidth,
				}));
			};

			const mouseUp = (e: MouseEvent) => {
				pauseEvent(e);
				setResizeStart(null);
			};

			document.addEventListener('mouseup', mouseUp);
			document.addEventListener('mousemove', mouseMove);

			return () => {
				document.removeEventListener('mouseup', mouseUp);
				document.removeEventListener('mousemove', mouseMove);
			};
		}
	}, [resizeStart]);

	const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
		pauseEvent(e as unknown as Event);
		const oldSize = tableState.columnSizes[key] ?? 0;
		const pageX = e.pageX;
		setResizeStart({ key, pageX, clientWidth: oldSize });
	};

	return { startResize };
};

export default useTableResize;
