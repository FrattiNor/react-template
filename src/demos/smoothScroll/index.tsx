import React from 'react';

import './index.css';

import { elementScroll, useVirtualizer, VirtualizerOptions } from '@tanstack/react-virtual';

function easeInOutQuint(t: any) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

function App() {
    const parentRef = React.useRef<any>();
    const scrollingRef = React.useRef<number>();

    const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] = React.useCallback((offset, canSmooth, instance) => {
        const duration = 1000;
        const start = parentRef.current.scrollTop;
        const startTime = (scrollingRef.current = Date.now());

        const run = () => {
            if (scrollingRef.current !== startTime) return;
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
            const interpolated = start + (offset - start) * progress;

            if (elapsed < duration) {
                elementScroll(interpolated, canSmooth, instance);
                requestAnimationFrame(run);
            } else {
                elementScroll(interpolated, canSmooth, instance);
            }
        };

        requestAnimationFrame(run);
    }, []);

    const rowVirtualizer = useVirtualizer({
        count: 10000,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
        scrollToFn,
    });

    const randomIndex = Math.floor(Math.random() * 10000);

    return (
        <div>
            <p>
                This smooth scroll example uses the <code>`scrollToFn`</code> to implement a custom scrolling function for the methods like{' '}
                <code>`scrollToIndex`</code> and <code>`scrollToOffset`</code>
            </p>

            <br />
            <br />

            <div>
                <button onClick={() => rowVirtualizer.scrollToIndex(randomIndex)}>Scroll To Random Index ({randomIndex})</button>
            </div>

            <br />
            <br />

            <div
                ref={parentRef}
                className="List"
                style={{
                    height: `200px`,
                    width: `400px`,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <div
                            key={virtualRow.index}
                            className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            Row {virtualRow.index}
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <br />
            {process.env.NODE_ENV === 'development' ? (
                <p>
                    <strong>Notice:</strong> You are currently running React in development mode. Rendering performance will be slightly degraded
                    until this application is build for production.
                </p>
            ) : null}
        </div>
    );
}

export default App;
