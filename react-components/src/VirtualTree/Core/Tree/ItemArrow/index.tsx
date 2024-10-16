import classNames from 'classnames';

import styles from './index.module.less';
import { type HandledDataItem } from '../../type';
import { type TreeInstance } from '../../useTree/type';
import ArrowSvg from '../Icons/ArrowSvg';

type Props<T, K> = {
	handleData: HandledDataItem<T, K>;
	treeInstance: TreeInstance<T, K>;
};

const ItemArrow = <T, K>({ handleData, treeInstance }: Props<T, K>) => {
	const { triggerVisibleByItem } = treeInstance;

	const { data, isLeaf, visible } = handleData;

	return !isLeaf ? (
		<div
			className={classNames(styles['arrow'], { [styles['visible']]: visible })}
			onClick={(e) => {
				e.stopPropagation();
				triggerVisibleByItem(data);
			}}
		>
			<ArrowSvg />
		</div>
	) : (
		<div className={styles['empty-arrow']} />
	);
};

export default ItemArrow;
