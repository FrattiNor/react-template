import { Fragment, memo } from 'react';

import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';

import propsAreEqual, { getInstanceProps } from './propsAreEqual';
import BodyRowOverlay from '../BodyRowOverlay';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const DragOverlay = <T extends TableDataItem>(props: Props<T>) => {
	const { dragActiveItem, bodyClientWidth } = getInstanceProps(props);

	return (
		<Fragment>
			<DndDragOverlay
				zIndex={9999}
				dropAnimation={null}
				style={{ overflow: 'hidden', pointerEvents: 'none', userSelect: 'none', width: bodyClientWidth }}
			>
				{dragActiveItem && <BodyRowOverlay rowIndex={dragActiveItem.rowIndex} instance={props.instance} />}
			</DndDragOverlay>
		</Fragment>
	);
};

export default memo(DragOverlay, propsAreEqual) as typeof DragOverlay;
