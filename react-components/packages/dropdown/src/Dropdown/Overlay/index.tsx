import { useAnimate, useMousedownBlank } from '@react/hooks';
import { FC, useEffect, useReducer, useRef } from 'react';
import usePosition, { Position } from './usePosition';
import { OverlayProps } from '../../type';
import styles from './index.module.less';
import useObserver from './useObserver';
import classNames from 'classnames';

const Overlay: FC<OverlayProps> = (props) => {
    const getPosition = usePosition();
    const rerender = useReducer(() => ({}), {})[1];
    const overlayRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef<Position | null>(null);
    const { x, y, topBottom = 'top' } = positionRef.current || {};
    const { target, container, items, visible, placement, destroy } = props;
    const { theme, themeClassName, applyClassName, overlaySameWidth, targetWidth, overlayFollow } = props;

    const { status, listeners, enter, leave } = useAnimate({
        beforeEnter: () => {
            if (overlayRef.current) positionRef.current = getPosition({ target, container, placement, overlay: overlayRef.current });
        },
        afterLeave: () => {
            destroy();
        },
    });

    useEffect(() => {
        if (visible === true) {
            enter();
        } else {
            leave();
        }
    }, [visible]);

    // 点击空白位置
    useMousedownBlank(overlayRef, () => {
        leave();
    });

    // 监听target位置变化
    useObserver(target, {
        overlayFollow,
        callback: () => {
            if (overlayRef.current) {
                positionRef.current = getPosition({ target, container, placement, overlay: overlayRef.current });
                rerender();
            }
        },
    });

    return (
        <div
            {...listeners}
            style={{ top: y, left: x }}
            className={classNames(styles[theme], themeClassName, applyClassName, styles['overlay'], styles[topBottom], {
                [styles['before-enter']]: status.beforeEnter,
                [styles['enter']]: status.isEnter, // 执行动画
                [styles['leave']]: status.isLeave, // 执行动画
            })}
        >
            <div ref={overlayRef} className={styles['content-wrapper']}>
                <div style={{ minWidth: overlaySameWidth ? targetWidth : 0 }} className={styles['content']}>
                    {items.map(({ key, label, onClick }) => {
                        const itemClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
                            let canLeave = true;
                            if (typeof onClick === 'function') {
                                const clickRes = onClick(e);
                                canLeave = clickRes !== false;
                            }
                            if (canLeave) {
                                leave();
                            }
                        };

                        return (
                            <div key={key} onClick={itemClick} className={styles['item']}>
                                {label}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Overlay;
