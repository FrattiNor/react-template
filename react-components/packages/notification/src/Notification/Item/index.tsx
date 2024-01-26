import { InfoSvg, ErrorSvg, WarningSvg, SuccessSvg, CloseX } from '@pkg/widgets';
import { NotificationRenderQueenItem, NotificationType } from '../../type';
import { FC, useEffect, useRef, useState } from 'react';
import useAnimate from '@react/hooks/useAnimate';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = {
    first: boolean; // 第一条
    item: NotificationRenderQueenItem;
};

const typeIcon: Record<NotificationType, FC> = {
    info: InfoSvg,
    error: ErrorSvg,
    warning: WarningSvg,
    success: SuccessSvg,
};

const Item: FC<Props> = ({ item, first }) => {
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
            }, duration);

            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
            };
        }
    }, [duration, hover]);

    return (
        <div
            {...listeners}
            style={{ height: heightRef.current }}
            className={classNames(styles['item-wrapper'], {
                [styles['first']]: first,
                [styles['top']]: placement.includes('top'),
                [styles['left']]: placement.includes('Left'),
                [styles['right']]: placement.includes('Right'),
                [styles['bottom']]: placement.includes('bottom'),
                [styles['before-enter']]: status.beforeEnter, // 初始状态
                [styles['enter']]: status.isEnter, // 执行动画
                [styles['leave']]: status.isLeave, // 执行动画
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
