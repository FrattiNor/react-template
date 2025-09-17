import styles from './index.module.less';
import HeadRow from './HeadRow';
import HeadGroupRow from './HeadGroupRow';
import HeaderHeightRetainer from './HeaderHeightRetainer';
import type { TableInstance } from '../../TableHooks/type';
import type { TableDataItem } from '../../TableTypes/type';
import { memo } from 'react';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

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

export default memo(TableHead, propsAreEqual) as typeof TableHead;
