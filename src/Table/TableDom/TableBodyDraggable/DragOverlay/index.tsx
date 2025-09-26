import { memo } from 'react';

import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';

import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const DragOverlay = <T extends TableDataItem>(props: Props<T>) => {
	const { dragActiveItem } = getInstanceProps(props);

	return (
		<DndDragOverlay zIndex={9999} style={{ overflow: 'hidden', pointerEvents: 'none', userSelect: 'none' }}>
			{dragActiveItem && <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.1)' }}></div>}
		</DndDragOverlay>
	);
};

export default memo(DragOverlay, propsAreEqual) as typeof DragOverlay;
