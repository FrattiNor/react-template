import { useDeviceList } from '@/services/device';
import useVirtualizer from './useVirtualizer';
import { useRef, useState } from 'react';
import styles from './index.module.less';
import useScroll from './useScroll';
import classNames from 'classnames';

const App = () => {
    const tipRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const demoItemRef = useRef<HTMLDivElement>(null);
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});
    const { data, count, fetchNextPage, refetch } = useDeviceList(1);
    const { scroll, getPullDownTip } = useScroll({ scrollRef, tipRef, refetch });
    const { virtualizer, items, totalSize } = useVirtualizer({
        count,
        scroll,
        scrollRef,
        demoItemRef,
        fetchNextPage,
    });

    return (
        <div className={styles['wrapper']}>
            <div className={styles['handle']}>
                <button onClick={() => virtualizer?.scrollToOffset(0)}>顶部</button>
                <button onClick={() => virtualizer?.scrollToIndex(Math.floor(count / 2))}>中间</button>
                <button onClick={() => virtualizer?.scrollToIndex(count - 1)}>底部</button>
                <button onClick={() => fetchNextPage()}>fetchNextPage</button>
                <button onClick={() => refetch()}>refetch</button>
            </div>

            <div ref={scrollRef} className={styles['scroll-wrapper']}>
                <div className={styles['container']} style={{ height: `${totalSize}px` }}>
                    <div ref={tipRef} className={styles['tip']}>
                        {getPullDownTip()}
                    </div>

                    <div className={styles['container-inner']} style={{ transform: `translateY(${items?.[0]?.start || 0}px)` }}>
                        <div ref={demoItemRef} className={classNames(styles['item'], styles['demo'])}>
                            xxx
                        </div>

                        {items.map((virtualItem) => (
                            <div
                                key={virtualItem.key}
                                data-index={virtualItem.index}
                                ref={virtualizer?.measureElement}
                                className={classNames(styles['item'], {
                                    [styles['open']]: visibles[virtualItem.key],
                                    [styles['first']]: virtualItem.index === 0,
                                    [styles['even']]: !(virtualItem.index % 2),
                                    [styles['odd']]: virtualItem.index % 2,
                                })}
                                onClick={() => setVisibles((v) => ({ ...v, [virtualItem.key]: !v[virtualItem.key] }))}
                            >
                                {data[virtualItem.index].isdmTag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
