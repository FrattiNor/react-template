import styles from './index.module.less';
import HeadRow from './HeadRow';
import HeadGroupRow from './HeadGroupRow';
import HeaderHeightRetainer from './HeaderHeightRetainer';
import type { TableInstance } from '../../TableHooks/type';
import type { TableDataItem } from '../../TableTypes/type';
import { memo } from 'react';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableHead = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { headRef } = instance.tableDomRef;
	const { columnGroups } = instance.tableProps;
	const { V_ScrollbarWidth } = instance.tableState;
	const { gridTemplateColumnsArr } = instance.tableSecondaryState;
	const gridTemplateColumns = V_ScrollbarWidth > 0 ? [...gridTemplateColumnsArr, `minmax(${V_ScrollbarWidth}px, 1fr)`].join(' ') : gridTemplateColumnsArr.join(' ');

	return (
		<div className={styles['head']} ref={headRef}>
			<div className={styles['head-inner']} style={{ gridTemplateColumns }}>
				{columnGroups.map((_, rowIndex) => (
					<HeadGroupRow key={rowIndex} rowIndex={rowIndex} instance={instance} />
				))}
				<HeadRow rowIndex={columnGroups.length} instance={instance} />
				<HeaderHeightRetainer instance={instance} />
			</div>
		</div>
	);
};

export default memo(TableHead) as typeof TableHead;
