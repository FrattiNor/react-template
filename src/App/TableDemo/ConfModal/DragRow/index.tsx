import type { ChangeEvent, Dispatch, FC, ReactNode, SetStateAction } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import DragIcon from '../DragIcon';
import styles from './index.module.less';

type Props = {
	item: { key: string; title: ReactNode };
	_widthConf: Record<string, number>;
	_visibleConf: Record<string, boolean>;
	_setWidthConf: Dispatch<SetStateAction<Record<string, number>>>;
	_setVisibleConf: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const DragRow: FC<Props> = ({ item, _visibleConf, _setVisibleConf, _widthConf, _setWidthConf }) => {
	const width = _widthConf[item.key];
	const visible = _visibleConf[item.key] ?? true;

	const { attributes, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.key });

	const _style: React.CSSProperties = {
		transition,
		zIndex: isDragging ? 2 : 1,
		transform: CSS.Translate.toString(transform),
	};

	const changeVisible = (e: ChangeEvent<HTMLInputElement>) => {
		const key = e.target.getAttribute('data-key');
		if (key) {
			_setVisibleConf((old) => {
				old[key] = e.target.checked;
				return { ...old };
			});
		}
	};

	const changeWidth = (e: ChangeEvent<HTMLInputElement>) => {
		const key = e.target.getAttribute('data-key');
		if (key) {
			_setWidthConf((old) => {
				old[key] = Number(e.target.value);
				return { ...old };
			});
		}
	};

	return (
		<div className={classNames(styles['item'], { [styles['active']]: isDragging })} ref={setNodeRef} style={_style} {...attributes}>
			<DragIcon id={item.key} />
			<label className={styles['visible']}>
				<input data-key={item.key} type="checkbox" className={styles['input']} checked={visible} onChange={changeVisible} />
				<span className={styles['title']}>{item.title}</span>
			</label>
			<input data-key={item.key} type="number" className={styles['width-input']} value={width} onChange={changeWidth} />
		</div>
	);
};

export default DragRow;
