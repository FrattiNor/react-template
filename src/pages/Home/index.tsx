import { useDeviceList } from '@/services/device';
import useVirtualizer from './useVirtualizer';
import styles from './index.module.less';
import { useRef, useState } from 'react';
import useScroll from './useScroll';
import classNames from 'classnames';

const App = () => {
    const tipRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data, count, fetchNextPage, refetch, setParams } = useDeviceList(1);
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});
    const { scroll, getPullDownTip } = useScroll({ scrollRef, tipRef, refetch });
    const { virtualizer, items, totalSize } = useVirtualizer({
        count,
        scroll,
        scrollRef,
        fetchNextPage,
    });

    return (
        <div className={styles['wrapper']}>
            <div className={styles['handle']}>
                <button onClick={() => virtualizer?.scrollToOffset(0)}>顶部</button>
                <button onClick={() => virtualizer?.scrollToIndex(Math.floor(count / 2))}>中间</button>
                <button onClick={() => virtualizer?.scrollToIndex(count - 1)}>底部</button>
                <button onClick={() => fetchNextPage()}>nextPage</button>
                <button onClick={() => refetch()}>refetch</button>
                <button onClick={() => setParams({ isdmTag: 'AI01060116' })}>setParams</button>
                <button onClick={() => scroll?.refresh()}>refresh</button>
            </div>

            <div ref={scrollRef} className={styles['scroll-wrapper']}>
                <div className={styles['container']} style={{ height: `${totalSize}px` }}>
                    <div ref={tipRef} className={styles['pullDownTip']}>
                        {getPullDownTip()}
                    </div>

                    <div className={styles['container-inner']} style={{ transform: `translateY(${items?.[0]?.start || 0}px)` }}>
                        {items.map((virtualItem) => {
                            // items的更新比count慢，可能会出现items数量多于count的情况
                            if (virtualItem.index < count) {
                                return (
                                    <div
                                        key={virtualItem.key}
                                        data-index={virtualItem.index}
                                        ref={virtualizer?.measureElement}
                                        className={classNames(styles['item'], {
                                            [styles['odd']]: virtualItem.index % 2,
                                            [styles['even']]: !(virtualItem.index % 2),
                                            [styles['first']]: virtualItem.index === 0,
                                            [styles['open']]: visibles[virtualItem.key],
                                        })}
                                        onClick={() => setVisibles((v) => ({ ...v, [virtualItem.key]: !v[virtualItem.key] }))}
                                    >
                                        Row {virtualItem.index} {data[virtualItem.index].isdmTag}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <div className={styles['container-inner-bottom']} />
                </div>
            </div>
        </div>
    );
};

export default App;
