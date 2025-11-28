import { memo } from 'react';

import classNames from 'classnames';

import useTableInstance from '../useTableInstance';
import styles from './index.module.less';
import ScrollbarH from './ScrollbarH';
import DelayVisible from './ScrollbarH/DelayVisible';
import ScrollbarV from './ScrollbarV';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableLoading from './TableLoading';

import type { TableComponent } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';

const Table = <T,>(_props: TableProps<T>) => {
	const props = useTableInstance(_props);

	return (
		<TableLoading
			loadingMaxHeight={400}
			loading={props.loading}
			className={classNames(styles['table'], {
				[styles['bordered']]: props.bordered,
				[styles['no-bordered-and-no-h-scrollbar']]: !props.bordered && !(props.h_scrollbar.width > 0),
			})}
		>
			<TableHead
				headRef={props.headRef}
				bordered={props.bordered}
				deepLevel={props.deepLevel}
				rowHeight={props.rowHeight}
				resizeFlag={props.resizeFlag}
				v_scrollbar={props.v_scrollbar}
				startResize={props.startResize}
				getHeadCellBg={props.getHeadCellBg}
				splitColumnsArr={props.splitColumnsArr}
				columnsKeyIndexMap={props.columnsKeyIndexMap}
				getHeadStickyStyle={props.getHeadStickyStyle}
				gridTemplateColumns={props.gridTemplateColumns}
			/>
			<div className={styles['table-body-wrapper']}>
				<TableBody
					data={props.data}
					rowKey={props.rowKey}
					bodyRef={props.bodyRef}
					resized={props.resized}
					bordered={props.bordered}
					bodyWidth={props.bodyWidth}
					rowHeight={props.rowHeight}
					resizeFlag={props.resizeFlag}
					bodyRowClick={props.bodyRowClick}
					sizeCacheMap={props.sizeCacheMap}
					bodyInnerRef={props.bodyInnerRef}
					setPingedMap={props.setPingedMap}
					fixedLeftMap={props.fixedLeftMap}
					fixedRightMap={props.fixedRightMap}
					getBodyCellBg={props.getBodyCellBg}
					setSizeCacheMap={props.setSizeCacheMap}
					splitColumnsArr={props.splitColumnsArr}
					bodyRowMouseEnter={props.bodyRowMouseEnter}
					bodyRowMouseLeave={props.bodyRowMouseLeave}
					columnsKeyIndexMap={props.columnsKeyIndexMap}
					getBodyStickyStyle={props.getBodyStickyStyle}
					splitColumnsArr_01={props.splitColumnsArr_01}
					gridTemplateColumns={props.gridTemplateColumns}
				/>
				<ScrollbarV bodyRef={props.bodyRef} vScrollbarRef={props.vScrollbarRef} bordered={props.bordered} v_scrollbar={props.v_scrollbar} />
			</div>
			<DelayVisible visible={props.h_scrollbar.have} delayTime={25}>
				<ScrollbarH
					bodyRef={props.bodyRef}
					headRef={props.headRef}
					bordered={props.bordered}
					h_scrollbar={props.h_scrollbar}
					v_scrollbar={props.v_scrollbar}
					hScrollbarRef={props.hScrollbarRef}
				/>
			</DelayVisible>
		</TableLoading>
	);
};

export default memo(Table) as TableComponent;
