/* eslint-disable react-refresh/only-export-components */
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});
    const virtualizer = useVirtualizer({
        getScrollElement: () => ref.current as HTMLDivElement,
        onChange: () => {
            console.log(count);
            console.log(virtualizer.getTotalSize());
        },
        estimateSize: () => 35,
        count,
    });

    const totalSize = virtualizer.getTotalSize();
    const items = virtualizer.getVirtualItems();
    console.log('totalSize', totalSize);
    console.log('items', items);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['handle']}>
                <button onClick={() => virtualizer?.scrollToOffset(0)}>顶部</button>
                <button onClick={() => virtualizer?.scrollToIndex(Math.floor(count / 2))}>中间</button>
                <button onClick={() => virtualizer?.scrollToIndex(count - 1)}>底部</button>
                <button onClick={() => setCount(100)}>fetchNextPage</button>
            </div>

            <div ref={ref} className={styles['scroll-wrapper']}>
                <div className={styles['container']} style={{ height: `${totalSize}px` }}>
                    <div className={styles['container-inner']} style={{ transform: `translateY(${items?.[0]?.start}px)` }}>
                        {items?.map((virtualItem) => (
                            <div
                                key={virtualItem.key}
                                data-index={virtualItem.index}
                                style={{ height: virtualItem.size }}
                                // ref={virtualizer?.measureElement}
                                className={classNames(styles['item'], {
                                    [styles['open']]: visibles[virtualItem.key],
                                    [styles['first']]: virtualItem.index === 0,
                                    [styles['even']]: !(virtualItem.index % 2),
                                    [styles['odd']]: virtualItem.index % 2,
                                })}
                                onClick={() => setVisibles((v) => ({ ...v, [virtualItem.key]: !v[virtualItem.key] }))}
                            >
                                ROW {virtualItem.index}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
