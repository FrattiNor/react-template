import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';
import ListItem from './ListItem';
import Empty from '../../../Empty';
import LoadingDiv from '../../../LoadingDiv';
import { type VirtualListKey, type VirtualListProps } from '../type';
import useList from '../useList';
import ListItemBlock from './ListItemBlock';

const VirtualList = <T, K extends VirtualListKey>(props: VirtualListProps<T, K>) => {
	const listInstance = useList(props);

	const {
		setKeyword,
		showData,
		isEmpty,
		withDefaultProps,
		virtualWrapperRef,
		virtual: { virtualItems, totalSize, measureElement, distance },
	} = listInstance;

	const {
		width,
		loading,
		listClassName,
		listStyle,
		wrapperClassName,
		wrapperStyle,
		searchClassName,
		searchStyle,
		showSearch,
		lineHeight,
		title,
		paddingLeft,
		blockNode,
	} = withDefaultProps;

	return (
		<LoadingDiv loading={loading} className={classNames(styles['wrapper'], wrapperClassName)} style={{ width, ...wrapperStyle }}>
			{title && <div className={styles['title']}>{title}</div>}

			{showSearch && (
				<div className={classNames(styles['search'], searchClassName)} style={searchStyle}>
					<Input
						allowClear
						onChange={(e) => setKeyword(e.target.value)}
						style={{ width: 0, flexGrow: 1, backgroundColor: 'transparent', overflow: 'hidden' }}
						suffix={<SearchOutlined style={{ color: 'var(--theme-placeholder-foreground)' }} />}
					/>
				</div>
			)}

			<div ref={virtualWrapperRef} className={classNames(styles['list'], listClassName)} style={listStyle}>
				{isEmpty && (
					<div className={styles['empty']}>
						<Empty />
					</div>
				)}

				{!isEmpty && (
					<div className={styles['virtual-list']} style={{ height: totalSize, paddingTop: distance }}>
						{virtualItems.map((verticalItem) => {
							const rowIndex = verticalItem?.index;

							if (typeof rowIndex === 'number') {
								const rowData = showData?.[rowIndex];

								if (rowData) {
									return (
										<div ref={measureElement} key={rowData.key} data-index={rowIndex} className={styles['list-row-wrapper']}>
											{blockNode ? (
												<ListItemBlock
													handleData={rowData}
													listInstance={listInstance}
													style={{ paddingLeft, minHeight: lineHeight }}
												/>
											) : (
												<ListItem
													handleData={rowData}
													listInstance={listInstance}
													style={{ paddingLeft, minHeight: lineHeight }}
												/>
											)}
										</div>
									);
								}
							}
						})}
					</div>
				)}
			</div>
		</LoadingDiv>
	);
};

export default VirtualList;
