import type { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import styles from './index.module.less';

import type useColumns from '../useColumns';

type Props = {
	visible: boolean;
	setVisible: (v: boolean) => void;
	leafColumns: ReturnType<typeof useColumns>['leafColumns'];
	setSortConf: Dispatch<SetStateAction<Record<string, number>>>;
	visibleConf: Record<string, boolean>;
	setVisibleConf: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const Modal: FC<Props> = ({ visible }) => {
	if (!visible) return null;
	return (
		<div className={styles['dialog']}>
			<p>first dialog</p>
		</div>
	);
};

const ConfModal: FC<Props> = (Props) => {
	return createPortal(<Modal {...Props} />, document.body);
};

export default ConfModal;
