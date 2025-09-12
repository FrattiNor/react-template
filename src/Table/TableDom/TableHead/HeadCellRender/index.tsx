import type { CSSProperties, FC, ReactNode } from 'react';
import styles from './index.module.less';

type Props = {
	title: ReactNode;
	align?: 'left' | 'right' | 'center';
};

const HeadCellRender: FC<Props> = ({ title, align }) => {
	const cellRenderValue = title;

	const alignStyle: CSSProperties = { justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' };

	if (typeof cellRenderValue === 'string' || typeof cellRenderValue === 'number') {
		return (
			<div className={styles['head-cell-render']} style={alignStyle}>
				<div className={styles['head-cell-render-str']}>{cellRenderValue}</div>
			</div>
		);
	}

	return (
		<div className={styles['head-cell-render']} style={alignStyle}>
			<div className={styles['head-cell-render-block']}>{cellRenderValue}</div>
		</div>
	);
};

export default HeadCellRender;
