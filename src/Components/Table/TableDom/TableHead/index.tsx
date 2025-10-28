import classNames from 'classnames';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import HeadRow from './HeadRow';
import type { FC } from 'react';

const TableHead: FC = () => {
	console.log('TableHead re-render');
	const { tableDomRef, tableColumns } = useTableContext();
	const { headRef } = tableDomRef;
	const { gridTemplateColumns } = tableColumns;
	return (
		<div ref={headRef} className={classNames(styles['head'])}>
			<div className={classNames(styles['head-inner'])} style={{ gridTemplateColumns }}>
				<HeadRow rowIndex={0} />
			</div>
		</div>
	);
};

export default TableHead;
