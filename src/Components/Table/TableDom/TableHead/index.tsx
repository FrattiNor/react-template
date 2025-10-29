import classNames from 'classnames';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import HeadRow from './HeadRow';
import type { FC } from 'react';
import { useAppSelector } from '../../TableState';

const TableHead: FC = () => {
	const { tableDomRef, tableColumns, props } = useTableContext();
	if (props.logRender?.head) console.log('TableHead re-render');
	const { headRef } = tableDomRef;
	const { gridTemplateColumns } = tableColumns;
	const V_ScrollBarWidth = useAppSelector((state) => state.V_ScrollBarWidth);
	return (
		<div ref={headRef} className={classNames(styles['head'])}>
			<div
				className={classNames(styles['head-inner'])}
				style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(${V_ScrollBarWidth}px, 1fr)` }}
			>
				<HeadRow rowIndex={0} />
			</div>
		</div>
	);
};

export default TableHead;
