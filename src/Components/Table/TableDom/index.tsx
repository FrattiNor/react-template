import { memo } from 'react';

import classNames from 'classnames';

import useTableInstance from '../useTableInstance';
import styles from './index.module.less';
import ScrollbarH from './ScrollbarH';
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
				v_scrollbar={props.v_scrollbar}
				getStickyStyle={props.getStickyStyle}
				splitColumnsArr={props.splitColumnsArr}
				pingedRightStart={props.pingedRightStart}
				gridTemplateColumns={props.gridTemplateColumns}
			/>
			<div className={styles['table-body-wrapper']}>
				<TableBody
					data={props.data}
					rowKey={props.rowKey}
					bodyRef={props.bodyRef}
					bordered={props.bordered}
					rowHeight={props.rowHeight}
					bodyInnerRef={props.bodyInnerRef}
					setPingedObj={props.setPingedObj}
					fixedLeftObj={props.fixedLeftObj}
					fixedRightObj={props.fixedRightObj}
					getStickyStyle={props.getStickyStyle}
					setSizeCacheMap={props.setSizeCacheMap}
					splitColumnsArr={props.splitColumnsArr}
					splitColumnsArr_01={props.splitColumnsArr_01}
					gridTemplateColumns={props.gridTemplateColumns}
				/>
				<ScrollbarV bodyRef={props.bodyRef} vScrollbarRef={props.vScrollbarRef} bordered={props.bordered} v_scrollbar={props.v_scrollbar} />
			</div>
			<ScrollbarH
				bodyRef={props.bodyRef}
				headRef={props.headRef}
				bordered={props.bordered}
				h_scrollbar={props.h_scrollbar}
				v_scrollbar={props.v_scrollbar}
				hScrollbarRef={props.hScrollbarRef}
			/>
		</TableLoading>
	);
};

export default memo(Table) as TableComponent;
