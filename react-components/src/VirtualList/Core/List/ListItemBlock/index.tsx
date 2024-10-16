import { type CSSProperties } from 'react';

import { Checkbox, Radio } from 'antd';
import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';

import styles from './index.module.less';
import Highlight from '../../../../Highlight';
import { type HandledDataItem } from '../../type';
import { type ListInstance } from '../../useList/type';

type Props<T, K> = {
	style: CSSProperties;
	handleData: HandledDataItem<T, K>;
	listInstance: ListInstance<T, K>;
};

const ListItem = <T, K>({ style, handleData, listInstance }: Props<T, K>) => {
	const { keyword, withDefaultProps, changeSelected } = listInstance;

	const { renderPrefix, renderSuffix, renderLabel, selectMode, showCheckbox } = withDefaultProps;

	const { key, data, label, disabled, selected } = handleData;

	return (
		<div
			style={style}
			onClick={() => !disabled && changeSelected(key, !selected)}
			className={classNames(styles['item-row'], {
				[styles['selected']]: selected,
				[styles['not-selected']]: !selected,
				[styles['disabled']]: disabled,
				[styles['not-disabled']]: !disabled,
				[styles['checkbox']]: showCheckbox,
				[styles['not-checkbox']]: !showCheckbox,
			})}
		>
			{renderPrefix && <div className={styles['prefix']}>{renderPrefix(data)}</div>}

			<div className={styles['content']}>
				{showCheckbox && (
					<Fragment>
						{selectMode === 'multiple' ? (
							<Checkbox checked={selected} disabled={disabled} style={{ margin: 0 }} />
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

export default ListItem;
