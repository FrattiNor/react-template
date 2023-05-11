import useVirtualizer from './useVirtualizer';
import styles from './index.module.less';
import { useRef, useState } from 'react';
import useScroll from './useScroll';
import classNames from 'classnames';

const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(101);
    const [visibles, setVisibles] = useState<Record<string, boolean>>({});
    const { scroll, tip } = useScroll({ scrollWrapperRef: ref });
    const nextPage = () => {
        return new Promise((res) => {
            setTimeout(() => {
                setCount((c) => c + 100);
                res(0);
            }, 100);
        });
    };
    const { virtualizer, totalSize, items } = useVirtualizer({ scrollWrapperRef: ref, scroll, count, getNextCount: nextPage });

    return (
        <div className={styles['wrapper']}>
            <div className={styles['handle']}>
                <button onClick={() => virtualizer?.scrollToOffset(0)}>顶部</button>
                <button onClick={() => virtualizer?.scrollToIndex(Math.floor(count / 2))}>中间</button>
                <button onClick={() => virtualizer?.scrollToIndex(count - 1)}>底部</button>
            </div>

            <div ref={ref} className={styles['scroll-wrapper']}>
                <div className={styles['container']} style={{ height: `${totalSize}px` }}>
                    <div dangerouslySetInnerHTML={{ __html: tip }} className={styles['pulldown-wrapper']} />
                    <div className={styles['container-inner']} style={{ transform: `translateY(${items?.[0]?.start}px)` }}>
                        {items?.map((virtualItem) => (
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
                                Row {virtualItem.index}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
