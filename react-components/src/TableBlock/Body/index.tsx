import { type CSSProperties, type RefObject } from 'react';

import classNames from 'classnames';

import Empty from './Empty';
import styles from './index.module.less';
import VirtualBody from './VirtualBody';
import { type DataSource } from '../hooks/useDataSource';
import { type VirtualCore } from '../hooks/useVirtual';
import { type TableBlockProps } from '../type';

type Props<T> = {
	isEmpty: boolean;
	virtual: VirtualCore<T>;
	props: TableBlockProps<T>;
	dataSource: DataSource<T>;
	bodyRef: RefObject<HTMLDivElement>;
};

const Body = <T,>(props: Props<T>) => {
	const { bodyRef, virtual, dataSource, props: tableBlockProps, isEmpty } = props;
	const { extendToTheRight } = tableBlockProps;

	// @ts-ignore
	// css变量控制向右延伸
	const style: CSSProperties = { '--right-distance': `${extendToTheRight ?? 0}px` };

	return (
		<div ref={bodyRef} style={style} className={classNames(styles['body'], { [styles['empty']]: isEmpty })}>
			{isEmpty && <Empty />}
			{!isEmpty && <VirtualBody virtual={virtual} dataSource={dataSource} props={tableBlockProps} />}
		</div>
	);
};

export default Body;
