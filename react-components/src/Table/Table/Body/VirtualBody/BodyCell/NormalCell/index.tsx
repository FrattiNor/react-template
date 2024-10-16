import { type FC, type CSSProperties } from 'react';

import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import styles from '../../../index.module.less';

type Props = {
	cellValue: any;
	title?: string;
	style?: CSSProperties;
};

const NormalCell: FC<Props> = (props) => {
	const { title, style } = props;
	const cellValue = notEmpty(props.cellValue);
	const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';

	return (
		<div title={title} style={style} className={styles['body-cell-inner']}>
			<div className={classNames(isStr ? styles['body-cell-str'] : styles['body-cell-block'])}>{cellValue}</div>
		</div>
	);
};

export default NormalCell;
