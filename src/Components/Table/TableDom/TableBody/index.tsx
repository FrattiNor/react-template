import classNames from 'classnames';
import styles from './index.module.less';
import type { FC } from 'react';
import { useTableContext } from '../../TableContext';
import BodyRow from './BodyRow';

const TableBody: FC = () => {
	const { props, tableColumns, tableData, tableDomRef } = useTableContext();
	if (props.logRender?.body) console.log('TableBody re-render');
	const { bodyRef } = tableDomRef;
	const { gridTemplateColumns } = tableColumns;
	const { bordered, data } = props;
	const { getRowKey } = tableData;
	return (
		<div ref={bodyRef} className={classNames(styles['body'], { [styles['bordered']]: bordered })}>
			<div className={classNames(styles['body-inner'])} style={{ gridTemplateColumns }}>
				{data?.map((dataItem, rowIndex) => {
					const key = getRowKey(dataItem, rowIndex);
					return <BodyRow key={key} rowIndex={rowIndex} />;
				})}
			</div>
		</div>
	);
};

export default TableBody;
