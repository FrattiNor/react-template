import { memo } from 'react';

import HeadGroupRow from './HeadGroupRow';
import HeadRow from './HeadRow';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableHead = <T extends TableDataItem>(props: Props<T>) => {
	const { headRef, columnGroups, headGridTemplateColumns } = getInstanceProps(props);

	return (
		<div ref={headRef} className={styles['head']}>
			<div className={styles['head-inner']} style={{ gridTemplateColumns: headGridTemplateColumns }}>
				{columnGroups.map((_, rowIndex) => (
					<HeadGroupRow key={rowIndex} rowIndex={rowIndex} instance={props.instance} />
				))}
				<HeadRow rowIndex={columnGroups.length} instance={props.instance} />
			</div>
		</div>
	);
};

export default memo(TableHead, propsAreEqual) as typeof TableHead;
