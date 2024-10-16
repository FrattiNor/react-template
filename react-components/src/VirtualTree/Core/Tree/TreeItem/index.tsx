import { type CSSProperties } from 'react';

import { Checkbox, Radio } from 'antd';
import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';

import styles from './index.module.less';
import Highlight from '../../../../Highlight';
import { type HandledDataItem } from '../../type';
import { type TreeInstance } from '../../useTree/type';
import ItemArrow from '../ItemArrow';

type Props<T, K> = {
	style: CSSProperties;
	handleData: HandledDataItem<T, K>;
	treeInstance: TreeInstance<T, K>;
};

const TreeItem = <T, K>({ style, handleData, treeInstance }: Props<T, K>) => {
	const { keyword, withDefaultProps, changeSelected } = treeInstance;

	const { renderPrefix, renderSuffix, renderLabel, selectMode, showCheckbox } = withDefaultProps;

	const { key, data, label, disabled, selected, indeterminate } = handleData;

	return (
		<div className={styles['item-row']} style={style}>
			<ItemArrow handleData={handleData} treeInstance={treeInstance} />

			{renderPrefix && <div className={styles['prefix']}>{renderPrefix(data)}</div>}

			<div
				onClick={() => !disabled && changeSelected(key, !selected)}
				className={classNames(styles['content'], {
					[styles['selected']]: selected,
					[styles['not-selected']]: !selected,
					[styles['disabled']]: disabled,
					[styles['not-disabled']]: !disabled,
					[styles['checkbox']]: showCheckbox,
					[styles['not-checkbox']]: !showCheckbox,
				})}
			>
				{showCheckbox && (
					<Fragment>
						{selectMode === 'multiple' ? (
							<Checkbox checked={selected} disabled={disabled} style={{ margin: 0 }} indeterminate={indeterminate} />
						) : (
							<Radio checked={selected} disabled={disabled} style={{ margin: 0 }} />
						)}
					</Fragment>
				)}

				<div className={styles['label']}>
					{renderLabel ? (
						renderLabel(data, handleData, keyword)
					) : (
						<span title={label}>
							<Highlight keyword={keyword}>{label}</Highlight>
						</span>
					)}
				</div>
			</div>

			{renderSuffix && <div className={styles['suffix']}>{renderSuffix(data)}</div>}
		</div>
	);
};

export default TreeItem;
