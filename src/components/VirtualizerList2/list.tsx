import useVirtualizer from './hooks/virtualizer/useVirtualizer';
import { Fragment, useCallback, useRef } from 'react';
import useScroll from './hooks/scroll/useScroll';
import LoadingIcon from '../LoadingIcon';
import EmptySvg from '@/assets/emptySvg';
import styles from './list.module.less';
import classNames from 'classnames';
import { ListProps } from './type';

function List<T>({ data, renderItem, rowKey, enableScroll, enablePullDown, enableLoadMore, scrollClassName }: ListProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const tipRef = useRef<HTMLDivElement>(null);
    const count = data.length;
    const empty = count === 0;

    const { scroll, fetchTip } = useScroll({ scrollRef, tipRef, enableScroll, enablePullDown });
    const { virtualizer, items, totalSize } = useVirtualizer({
        count,
        scroll,
        scrollRef,
        enableScroll,
        enableLoadMore,
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
            <div className={styles['container']} style={{ height: !empty ? `${totalSize}px` : '99%' }}>
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
                    <div className={styles['container-inner']} style={{ transform: `translateY(${items?.[0]?.start || 0}px)` }}>
                        {items.map((virtualItem) => {
                            const index = virtualItem.index;
                            // items 的更新比 count 慢，可能会出现 items 大于 count 的情况
                            if (index < count) {
                                const item = data[index];
                                const key = getRowKey(item, index);

                                return (
                                    <div key={key} data-index={index} ref={virtualizer?.measureElement}>
                                        {renderItem(item, { key, index })}
                                    </div>
                                );
                            }
                            if (enableLoadMore && index === count) {
                                const { isFetchingNextPage, hasNextPage } = enableLoadMore;

                                return (
                                    <div key="bottom-status" className={styles['bottom-status']}>
                                        {isFetchingNextPage && (
                                            <Fragment>
                                                <span>{`加载中 `}</span>
                                                <LoadingIcon />
                                            </Fragment>
                                        )}
                                        {!hasNextPage && <span>{`- 没有更多了 -`}</span>}
                                    </div>
                                );
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
