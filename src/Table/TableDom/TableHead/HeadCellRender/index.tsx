import type { CSSProperties, FC, ReactNode } from 'react';
import styles from './index.module.less';
import Sort from './Sort';
import Filter from './Filter';
import { useTableContext } from '../../../TableContext';

type Props = {
	content: ReactNode;
	align?: 'left' | 'right' | 'center';
};

const HeadCellRender: FC<Props> = ({ content, align }) => {
	const cellRenderValue = content;
	const { tableTools } = useTableContext();
	const title = tableTools.getCellTitle(cellRenderValue);
	const cellIsStr = typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number';
	const alignStyle: CSSProperties = { justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' };

	return (
		<div className={styles['head-cell-render-wrapper']} title={title}>
			<div className={styles['head-cell-render']} style={alignStyle}>
				<div className={cellIsStr ? styles['head-cell-render-str'] : styles['head-cell-render-block']}>{cellRenderValue}</div>
			</div>
			<Filter />
			<Sort />
		</div>
	);
};

export default HeadCellRender;
