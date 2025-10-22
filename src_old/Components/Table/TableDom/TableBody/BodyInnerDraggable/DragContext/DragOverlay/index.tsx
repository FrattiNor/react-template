import { memo } from 'react';

import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';

import BodyRowOverlay from './BodyRowOverlay';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const DragOverlay = <T extends TableDataItem>(props: Props<T>) => {
	const { dragActiveItem, bodyClientWidth } = getInstanceProps(props);

	return (
		<DndDragOverlay
			zIndex={9999}
			dropAnimation={null}
			style={{ width: bodyClientWidth, overflow: 'hidden', userSelect: 'none', pointerEvents: 'none', cursor: 'move' }}
		>
			{dragActiveItem && <BodyRowOverlay rowIndex={dragActiveItem.rowIndex} instance={props.instance} />}
		</DndDragOverlay>
	);
};

export default memo(DragOverlay, propsAreEqual) as typeof DragOverlay;
