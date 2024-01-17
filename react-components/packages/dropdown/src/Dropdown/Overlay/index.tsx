import { DropdownItem, DropdownPlacement } from '../../type';
import { useAnimate, useClickBlank } from '@react/hooks';
import usePosition, { Position } from './usePosition';
import { FC, useEffect, useRef } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Theme } from '@pkg/theme';

type Props = {
    theme: Theme;
    visible: boolean;
    target: HTMLElement;
    destroy: () => void;
    items: DropdownItem[];
    themeClassName: string;
    applyClassName: string;
    container: HTMLElement;
    placement: DropdownPlacement;
};

const Overlay: FC<Props> = (props) => {
    const getPosition = usePosition();
    const overlayRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef<Position | null>(null);
    const { x, y, topBottom = 'top' } = positionRef.current || {};
    const { theme, themeClassName, applyClassName } = props;
    const { target, container, items, visible, placement, destroy } = props;
    const targetWidth = target.clientWidth;

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
    useClickBlank(overlayRef, () => {
        leave();
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
                <div style={{ minWidth: targetWidth }} className={styles['content']}>
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
