import { FC, useEffect, useRef, useState } from 'react';

import { InfoSvg, ErrorSvg, WarningSvg, SuccessSvg, CloseX } from '@pkg/widgets';
import { useAnimate } from '@react/hooks';
import classNames from 'classnames';

import styles from './index.module.less';
import { NotificationRenderQueenItem, NotificationType } from '../../type';

type Props = {
    last: boolean; // 第一条
    windowFocus: boolean;
    item: NotificationRenderQueenItem;
};

const typeIcon: Record<NotificationType, FC> = {
    info: InfoSvg,
    error: ErrorSvg,
    warning: WarningSvg,
    success: SuccessSvg,
};

const Item: FC<Props> = ({ item, last, windowFocus }) => {
    const leaveRef = useRef(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const heightRef = useRef<number | undefined>(undefined);

    const [hover, setHover] = useState(false);
    const { type, message, duration, destroy, placement } = item;
    const Icon = type ? typeIcon[type] : undefined;

    const { status, leave, listeners } = useAnimate({
        autoEnter: true,
        beforeEnter: () => {
            if (itemRef.current) heightRef.current = itemRef.current.clientHeight;
        },
        afterEnter: () => {
            heightRef.current = undefined;
        },
        beforeLeave: () => {
            if (itemRef.current) heightRef.current = itemRef.current.clientHeight;
        },
        afterLeave: () => {
            destroy();
        },
    });

    useEffect(() => {
        if (!hover && typeof duration === 'number' && duration > 0) {
            timeout.current = setTimeout(() => {
                leave();
                leaveRef.current = true;
            }, duration);

            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
            };
        }
    }, [duration, hover]);

    // 如果窗口激活状态，并且item应该已经离开却没有离开，直接触发销毁
    useEffect(() => {
        if (windowFocus && leaveRef.current === true) {
            destroy();
        }
    }, [windowFocus]);

    return (
        <div
            {...listeners}
            style={{ height: heightRef.current }}
            className={classNames(styles['item-wrapper'], {
                [styles['last']]: last,
                [styles['top']]: placement.includes('top'),
                [styles['left']]: placement.includes('Left'),
                [styles['right']]: placement.includes('Right'),
                [styles['bottom']]: placement.includes('bottom'),
                [styles['before-enter']]: status.beforeEnter, // 初始状态
                [styles['entering']]: status.isEntering, // 执行动画
                [styles['leaving']]: status.isLeaving, // 执行动画
            })}
        >
            <div ref={itemRef} className={styles['item']} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {Icon && (
                    <div className={styles['icon']}>
                        <Icon />
                    </div>
                )}
                <div className={styles['message']}>{message}</div>
                <CloseX onClick={leave} />
            </div>
        </div>
    );
};

export default Item;
