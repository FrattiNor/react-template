import classNames from 'classnames';
import styles from './index.module.less';
import type { FC } from 'react';
import { useTableContext } from '../../../TableContext';
import HeadCell from './HeadCell';

type Props = {
	rowIndex: number;
};

const HeadRow: FC<Props> = ({ rowIndex }) => {
	console.log(`HeadRow(${rowIndex}) re-render`);
	const { props } = useTableContext();
	const { columns } = props;
	return (
		<div className={classNames(styles['head-row'])}>
			{columns.map((item, colIndex) => (
				<HeadCell key={item.key} rowIndex={rowIndex} colIndex={colIndex} />
			))}
		</div>
	);
};

export default HeadRow;
