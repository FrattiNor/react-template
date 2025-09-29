import type { FC, PropsWithChildren } from 'react';

import Button from 'antd/es/button';

import styles from './index.module.less';

type Props = PropsWithChildren<{
	onReset: () => void;
	onSubmit: () => void;
}>;

const TableFilterTemplate: FC<Props> = ({ children, onReset, onSubmit }) => {
	return (
		<div className={styles['filter-dropdown']}>
			<div className={styles['filter-content']}>{children}</div>
			<div className={styles['btn-wrapper']}>
				<Button size="small" onClick={onReset}>
					{'重置'}
				</Button>
				<Button size="small" type="primary" onClick={onSubmit}>
					{'确认'}
				</Button>
			</div>
		</div>
	);
};

export default TableFilterTemplate;
