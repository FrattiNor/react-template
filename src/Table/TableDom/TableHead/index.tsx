import { memo } from 'react';

import HeaderHeightRetainer from './HeaderHeightRetainer';
import HeadGroupRow from './HeadGroupRow';
import HeadRow from './HeadRow';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableHead = <T extends TableDataItem>(props: Props<T>) => {
	const { headRef, columnGroups, V_ScrollbarWidth, gridTemplateColumnsArr } = getInstanceProps(props);
	const gridTemplateColumns =
		V_ScrollbarWidth > 0 ? [...gridTemplateColumnsArr, `minmax(${V_ScrollbarWidth}px, 1fr)`].join(' ') : gridTemplateColumnsArr.join(' ');

	return (
		<div className={styles['head']} ref={headRef}>
			<div className={styles['head-inner']} style={{ gridTemplateColumns }}>
				{columnGroups.map((_, rowIndex) => (
					<HeadGroupRow key={rowIndex} rowIndex={rowIndex} instance={props.instance} />
				))}
				<HeadRow rowIndex={columnGroups.length} instance={props.instance} />
				<HeaderHeightRetainer instance={props.instance} />
			</div>
		</div>
	);
};

// export default TableHead;
export default memo(TableHead, propsAreEqual) as typeof TableHead;
