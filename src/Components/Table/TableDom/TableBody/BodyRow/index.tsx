import classNames from 'classnames';
import styles from './index.module.less';
import type { FC } from 'react';
import { useTableContext } from '../../../TableContext';
import BodyCell from './BodyCell';

type Props = {
	rowIndex: number;
};

const BodyRow: FC<Props> = ({ rowIndex }) => {
	const { props } = useTableContext();
	if (props.logRender?.bodyRow) console.log(`BodyRow(${rowIndex}) re-render`);
	const { columns } = props;
	return (
		<div className={classNames(styles['body-row'])}>
			{columns.map((item, colIndex) => (
				<BodyCell key={item.key} rowIndex={rowIndex} colIndex={colIndex} />
			))}
		</div>
	);
};

export default BodyRow;
