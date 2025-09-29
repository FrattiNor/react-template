import { type FC } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';

import styles from './index.module.less';

// 可拖拽
const DragIconSortable: FC<{ id: string }> = ({ id }) => {
	const { listeners, setActivatorNodeRef } = useSortable({ id });

	return (
		<div className={styles['drag-icon']} ref={setActivatorNodeRef} {...listeners}>
			<svg viewBox="64 64 896 896" focusable="false" data-icon="holder" width="1em" height="1em" fill="currentColor" aria-hidden="true">
				<path d="M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"></path>
			</svg>
		</div>
	);
};

const DragIcon: FC<{ id: string; isOverlay: boolean }> = ({ id, isOverlay }) => {
	if (!isOverlay) return <DragIconSortable id={id} />;

	// overlay
	return (
		<div className={classNames(styles['drag-icon'], { [styles['is-overlay']]: isOverlay })}>
			<svg viewBox="64 64 896 896" focusable="false" data-icon="holder" width="1em" height="1em" fill="currentColor" aria-hidden="true">
				<path d="M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"></path>
			</svg>
		</div>
	);
};

export default DragIcon;
