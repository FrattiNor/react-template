import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../../TableContext';

type Props = {
	colIndex: number;
};

const HeadCellRender: FC<Props> = ({ colIndex }) => {
	const { tableProps } = useTableContext();
	const { columns } = tableProps;
	const column = columns[colIndex];
	const cellRenderValue = column.title;

	if (typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number') {
		return (
			<div className={styles['head-cell-render']}>
				<div className={styles['head-cell-render-str']}>{cellRenderValue}</div>
			</div>
		);
	}

	return (
		<div className={styles['head-cell-render']}>
			<div className={styles['head-cell-render-block']}>{cellRenderValue}</div>
		</div>
	);
};

export default HeadCellRender;
