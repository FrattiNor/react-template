import { Fragment, useCallback, useRef } from 'react';
import useVirtualizer from './hooks/useVirtualizer';
import useScroll from './hooks/useScroll';
import LoadingIcon from '../LoadingIcon';
import EmptySvg from '@/assets/emptySvg';
import styles from './list.module.less';
import classNames from 'classnames';
import { ListProps } from './type';

function List<T>({ data, renderItem, rowKey, enableScroll, enablePullDown, enableLoadMore, scrollClassName, borderWidth = 0 }: ListProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const tipRef = useRef<HTMLDivElement>(null);
    const dataCount = data.length;
    const empty = dataCount === 0;

    const { scroll, fetchTip } = useScroll({ scrollRef, tipRef, enableScroll, enablePullDown });

    const { virtualizer, vTotalSize, vItems, vCount } = useVirtualizer({
        scroll,
        scrollRef,
        enableScroll,
        enableLoadMore,
        count: dataCount,
    });

    const getRowKey = useCallback(
        (item: T, index: number) => {
            if (typeof rowKey === 'string') {
                return item[rowKey] as string;
            }
            if (typeof rowKey === 'function') {
                return rowKey(item, index);
            }
            return 'undefined';
        },
        [rowKey],
    );

    return (
        <div ref={scrollRef} className={classNames(styles['scroll-wrapper'], scrollClassName)} style={{ overflow: enableScroll ? 'hidden' : 'auto' }}>
            <div className={classNames(styles['container'], { [styles['scroll']]: enableScroll })} style={{ height: `${vTotalSize}px` }}>
                {enablePullDown && (
                    <div ref={tipRef} className={styles['fetchTip']}>
                        {fetchTip}
                    </div>
                )}

                {empty && (
                    <div className={styles['empty']}>
                        <div className={styles['empty-inner']}>
                            <EmptySvg className={styles['icon']} />
                            <span className={styles['font']}>{`暂无数据`}</span>
                        </div>
                    </div>
                )}

                {!empty && (
                    <div className={styles['container-inner']} style={{ transform: `translateY(${vItems?.[0]?.start || 0}px)` }}>
                        {vItems.map((virtualItem) => {
                            const index = virtualItem.index;

                            if (index < vCount) {
                                if (enableLoadMore && index === vCount - 1) {
                                    const { isFetchingNextPage, hasNextPage } = enableLoadMore;

                                    return (
                                        <div
                                            data-index={index}
                                            key="bottom-status"
                                            ref={virtualizer?.measureElement}
                                            className={styles['bottom-status']}
                                        >
                                            {isFetchingNextPage && (
                                                <Fragment>
                                                    <span>{`加载中 `}</span>
                                                    <LoadingIcon />
                                                </Fragment>
                                            )}
                                            {!hasNextPage && <span>{`- 没有更多了 -`}</span>}
                                            {!isFetchingNextPage && hasNextPage && <span>{`-`}</span>}
                                        </div>
                                    );
                                } else {
                                    const item = data[index];
                                    const key = getRowKey(item, index);

                                    return (
                                        <div
                                            key={key}
                                            data-index={index}
                                            style={{ borderWidth }}
                                            ref={virtualizer?.measureElement}
                                            className={classNames(styles['item'], { [styles['first']]: index === 0 })}
                                        >
                                            {renderItem(item, { key, index })}
                                        </div>
                                    );
                                }
                            }

                            return null;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default List;
