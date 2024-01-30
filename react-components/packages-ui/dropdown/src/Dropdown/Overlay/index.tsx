import { useReducer, useRef, FC, useEffect } from 'react';

import { useTheme } from '@pkg/theme';
import { useMousedownBlank, useAnimate } from '@react/hooks';
import classNames from 'classnames';

import styles from './index.module.less';
import useObserver from './useObserver';
import usePosition, { Position } from './usePosition';
import { OverlayProps } from '../../type';

const Overlay: FC<OverlayProps> = (props) => {
    const getPosition = usePosition();
    const rerender = useReducer(() => ({}), {})[1];
    const overlayRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef<Position | null>(null);
    const { themeClassName, applyClassName, theme } = useTheme();
    const { x, y, topBottom = 'top' } = positionRef.current || {};
    const { target, container, items, placement, afterClose, visible, setVisible, overlaySameWidth, overlayFollow } = props;
    const targetWidth = target.offsetWidth;

    const { status, listeners, enter, leave } = useAnimate({
        beforeEnter: () => {
            if (overlayRef.current) positionRef.current = getPosition({ target, container, placement, overlay: overlayRef.current });
        },
        afterLeave: () => {
            if (typeof afterClose === 'function') afterClose();
        },
    });

    useEffect(() => {
        if (visible === true) {
            enter();
        } else {
            leave();
        }
    }, [visible]);

    // 点击空白位置【排除overlay和target】
    useMousedownBlank({
        callback: () => setVisible(false),
        elements: [target],
        refs: [overlayRef],
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
                [styles['entering']]: status.isEntering, // 执行动画
                [styles['leaving']]: status.isLeaving, // 执行动画
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
                                setVisible(false);
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
