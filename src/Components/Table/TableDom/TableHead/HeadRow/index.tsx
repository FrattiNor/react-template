import classNames from 'classnames';
import styles from './index.module.less';
import type { FC } from 'react';
import { useTableContext } from '../../../TableContext';
import HeadCell from './HeadCell';

type Props = {
	rowIndex: number;
};

const HeadRow: FC<Props> = ({ rowIndex }) => {
	const { props } = useTableContext();
	if (props.logRender?.headRow) console.log(`HeadRow(${rowIndex}) re-render`);
	const { columns } = props;
	return (
		<div className={classNames(styles['head-row'])}>
			{columns.map((item, colIndex) => (
				<HeadCell key={item.key} rowIndex={rowIndex} colIndex={colIndex} />
			))}
			<div />
		</div>
	);
};

export default HeadRow;
