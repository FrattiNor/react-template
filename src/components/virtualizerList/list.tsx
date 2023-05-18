import useVirtualizer from './hooks/virtualizer/useVirtualizer';
import useScroll from './hooks/scroll/useScroll';
import { useCallback, useRef } from 'react';
import EmptySvg from '@/assets/emptySvg';
import styles from './list.module.less';
import { ListProps } from './type';

function List<T>({ data, renderItem, rowKey, enableScroll }: ListProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const count = data.length;
    const empty = count === 0;

    const { scroll } = useScroll({ scrollRef, enableScroll });
    const { virtualizer, items, totalSize } = useVirtualizer({
        count,
        scroll,
        scrollRef,
        enableScroll,
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
        <div ref={scrollRef} className={styles['scroll-wrapper']} style={{ overflow: enableScroll ? 'hidden' : 'auto' }}>
            <div className={styles['container']} style={{ height: !empty ? `${totalSize}px` : '99%' }}>
                {empty && (
                    <div className={styles['empty']}>
                        <EmptySvg className={styles['icon']} />
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

                                return (
                                    <div key={key} data-index={index} ref={virtualizer?.measureElement}>
                                        {renderItem(item, index)}
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
