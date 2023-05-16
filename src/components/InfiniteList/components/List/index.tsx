import useVirtualizer from '../../hooks/virtualizer/useVirtualizer';
import { Fragment, useCallback, useRef, useState } from 'react';
import useScroll from '../../hooks/scroll/useScroll';
import Iconfont from '@/components/Iconfont';
import LoadingIcon from '../LoadingIcon';
import styles from './index.module.less';
import classNames from 'classnames';
import { Props } from '../../type';

function List<T>({ query, renderItem, rowKey, enableVisible }: Props<T>) {
    const tipRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data, count, empty, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = query;
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});
    const { scroll, fetchTip } = useScroll({ scrollRef, tipRef, refetch });
    const { virtualizer, items, totalSize } = useVirtualizer({
        count: count + 1, // 多给一位用于显示加载中
        scroll,
        scrollRef,
        fetchNextPage,
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

    const itemClick = useCallback(
        (key: string) => {
            if (enableVisible) {
                setVisibles((vs) => ({ ...vs, [key]: !vs[key] }));
            }
        },
        [enableVisible],
    );

    return (
        <div ref={scrollRef} className={styles['scroll-wrapper']}>
            <div className={styles['container']} style={{ height: !empty ? `${totalSize}px` : '99%' }}>
                <div ref={tipRef} className={styles['fetchTip']}>
                    {fetchTip}
                </div>

                {empty && (
                    <div className={styles['empty']}>
                        <Iconfont className={styles['icon']} icon="empty" />
                        <span className={styles['font']}>{`暂无数据`}</span>
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
                                const visible = visibles[key] || false;

                                return (
                                    <div
                                        key={key}
                                        data-index={index}
                                        onClick={() => itemClick(key)}
                                        ref={virtualizer?.measureElement}
                                        className={classNames(styles['item'], {
                                            [styles['odd']]: index % 2,
                                            [styles['even']]: !(index % 2),
                                            [styles['first']]: index === 0,
                                        })}
                                    >
                                        {renderItem(item, visible, index)}
                                    </div>
                                );
                            }

                            if (index === count) {
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
