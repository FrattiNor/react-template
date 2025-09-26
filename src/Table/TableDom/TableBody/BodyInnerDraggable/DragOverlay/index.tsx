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
	const { dragActiveItem } = getInstanceProps(props);

	return (
		<Fragment>
			<DndDragOverlay zIndex={9999} style={{ overflow: 'hidden', pointerEvents: 'none', userSelect: 'none' }}>
				{dragActiveItem && <BodyRowOverlay rowIndex={dragActiveItem.rowIndex} instance={props.instance} />}
			</DndDragOverlay>

			{/* <div
				style={{
					position: 'fixed',
					width: '5002.58px',
					height: '60px',
					top: '489px',
					left: '193px',
					backgroundColor: 'rgba(0,0,0,0.1)',
					zIndex: 99999,
					transform: 'translate3d(0px, 100px, 0px)',
					touchAction: 'none',
					overflow: 'hidden',
					pointerEvents: 'none',
					userSelect: 'none',
				}}
			>
				<BodyRowOverlay rowIndex={0} instance={props.instance} />
			</div> */}
		</Fragment>
	);
};

export default memo(DragOverlay, propsAreEqual) as typeof DragOverlay;
