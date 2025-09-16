import { memo, type CSSProperties, type ReactNode } from 'react';
import styles from './index.module.less';
import Sort from './Sort';
import Filter from './Filter';
import { getCellTitle } from '../../../TableUtils';
import propsAreEqual from './propsAreEqual';

export type Props = {
	content: ReactNode;
	align?: 'left' | 'right' | 'center';
};

const HeadCellRender = ({ content, align }: Props) => {
	const cellRenderValue = content;
	const title = getCellTitle(cellRenderValue);
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

export default memo(HeadCellRender, propsAreEqual) as typeof HeadCellRender;
