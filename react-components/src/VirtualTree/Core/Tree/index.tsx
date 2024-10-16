import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import classNames from 'classnames';

import SvgCollapse from './Icons/SvgCollapse';
import SvgExpand from './Icons/SvgExpand';
import styles from './index.module.less';
import TreeItem from './TreeItem';
import Empty from '../../../Empty';
import LoadingDiv from '../../../LoadingDiv';
import { type VirtualTreeKey, type VirtualTreeProps } from '../type';
import useTree from '../useTree';
import TreeItemBlock from './TreeItemBlock';
import { useTranslation } from '../../../Local';

const VirtualTree = <T, K extends VirtualTreeKey>(props: VirtualTreeProps<T, K>) => {
	const treeInstance = useTree(props);

	const { t1 } = useTranslation();

	const {
		setKeyword,
		closeAll,
		openAll,
		atLeastOneOpen,
		showData,
		isEmpty,
		virtualWrapperRef,
		withDefaultProps,
		virtual: { virtualItems, totalSize, measureElement, distance },
	} = treeInstance;

	const {
		width,
		loading,
		treeClassName,
		treeStyle,
		wrapperClassName,
		wrapperStyle,
		searchClassName,
		searchStyle,
		showSearch,
		lineHeight,
		title,
		paddingLeft,
		levelPaddingLeft,
		blockNode,
	} = withDefaultProps;

	return (
		<LoadingDiv loading={loading} className={classNames(styles['wrapper'], wrapperClassName)} style={{ width, ...wrapperStyle }}>
			{title && <div className={styles['title']}>{title}</div>}

			{showSearch && (
				<div className={classNames(styles['search'], searchClassName)} style={searchStyle}>
					<Button
						className={styles['expand-btn']}
						onClick={atLeastOneOpen ? closeAll : openAll}
						icon={atLeastOneOpen ? <SvgCollapse /> : <SvgExpand />}
						title={atLeastOneOpen ? t1('package@tree.collapse_all') : t1('package@tree.expand_all')}
					/>
					<Input
						allowClear
						onChange={(e) => setKeyword(e.target.value)}
						style={{ width: 0, flexGrow: 1, backgroundColor: 'transparent', overflow: 'hidden' }}
						suffix={<SearchOutlined style={{ color: 'var(--theme-placeholder-foreground)' }} />}
					/>
				</div>
			)}

			<div ref={virtualWrapperRef} className={classNames(styles['tree'], treeClassName)} style={treeStyle}>
				{isEmpty && (
					<div className={styles['empty']}>
						<Empty />
					</div>
				)}

				{!isEmpty && (
					<div className={styles['virtual-tree']} style={{ height: totalSize, paddingTop: distance }}>
						{virtualItems.map((verticalItem) => {
							const rowIndex = verticalItem?.index;

							if (typeof rowIndex === 'number') {
								const rowData = showData?.[rowIndex];

								if (rowData) {
									return (
										<div ref={measureElement} key={rowData.key} data-index={rowIndex} className={styles['tree-row-wrapper']}>
											{blockNode ? (
												<TreeItemBlock
													handleData={rowData}
													treeInstance={treeInstance}
													style={{ minHeight: lineHeight, paddingLeft: paddingLeft + rowData.level * levelPaddingLeft }}
												/>
											) : (
												<TreeItem
													handleData={rowData}
													treeInstance={treeInstance}
													style={{ minHeight: lineHeight, paddingLeft: paddingLeft + rowData.level * levelPaddingLeft }}
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

export default VirtualTree;
