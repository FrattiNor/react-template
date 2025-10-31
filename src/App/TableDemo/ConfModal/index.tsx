import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import CloseIcon from './CloseIcon';
import DragRow from './DragRow';
import styles from './index.module.less';

import type useColumns from '../useColumns';

type Props = {
	visible: boolean;
	setVisible: (v: boolean) => void;
	leafColumns: ReturnType<typeof useColumns>['leafColumns'];
	sortConf: Record<string, number>;
	setSortConf: Dispatch<SetStateAction<Record<string, number>>>;
	visibleConf: Record<string, boolean>;
	setVisibleConf: Dispatch<SetStateAction<Record<string, boolean>>>;
	widthConf: Record<string, number>;
	setWidthConf: Dispatch<SetStateAction<Record<string, number>>>;
};

const Modal: FC<Props> = ({ setVisible, leafColumns, visibleConf, setVisibleConf, sortConf, setSortConf, widthConf, setWidthConf }) => {
	const [_widthConf, _setWidthConf] = useState(() => widthConf);
	const [_visibleConf, _setVisibleConf] = useState(() => visibleConf);
	const [_leafColumns, _setLeafColumns] = useState(() => {
		return leafColumns
			.map((item, index) => ({ id: item.key, index, ...item }))
			.sort((a, b) => (sortConf[a.key] ?? a.index) - (sortConf[b.key] ?? b.index));
	});

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over?.id && active.id !== over.id) {
			_setLeafColumns((_items) => {
				let oldIndex = -1;
				let newIndex = -1;
				for (let i = 0; i < _items.length; i++) {
					const _item = _items[i];
					const itemId = _item.id;
					if (itemId === over.id) newIndex = i;
					if (itemId === active.id) oldIndex = i;
					if (oldIndex >= 0 && newIndex >= 0) break;
				}
				let nextItems = [..._items];
				if (oldIndex >= 0 && newIndex >= 0) nextItems = arrayMove(_items, oldIndex, newIndex);
				return nextItems;
			});
		}
	};

	const submit = () => {
		setVisible(false);
		setWidthConf(_widthConf);
		setVisibleConf(_visibleConf);
		setSortConf(() => {
			const newConf: Record<string, number> = {};
			_leafColumns.forEach((item, index) => (newConf[item.key] = index));
			return newConf;
		});
	};

	return (
		<div className={styles['mask']}>
			<div className={styles['dialog']} style={{ width: 500 }}>
				<div className={styles['head']}>
					<span>{'CONFIG'}</span>
					<CloseIcon onClick={() => setVisible(false)} />
				</div>
				<DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
					<SortableContext items={_leafColumns} strategy={verticalListSortingStrategy}>
						<div className={styles['body']}>
							{_leafColumns.map((item) => (
								<DragRow
									item={item}
									key={item.key}
									_widthConf={_widthConf}
									_visibleConf={_visibleConf}
									_setWidthConf={_setWidthConf}
									_setVisibleConf={_setVisibleConf}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
				<div className={styles['bottom']}>
					<button style={{ cursor: 'pointer' }} onClick={submit}>
						{'确认'}
					</button>
				</div>
			</div>
		</div>
	);
};

const ConfModal: FC<Props> = (props) => {
	if (!props.visible) return null;
	return createPortal(<Modal {...props} />, document.body);
};

export default ConfModal;
