import { NotificationRenderQueenItem, NotificationType } from '../../type';
import { FC, useEffect, useReducer, useRef, useState } from 'react';
import SuccessSvg from './Icons/SuccessSvg';
import WarningSvg from './Icons/WarningSvg';
import { useAnimate } from '@react/hooks';
import styles from './index.module.less';
import CloseSvg from './Icons/CloseSvg';
import ErrorSvg from './Icons/ErrorSvg';
import InfoSvg from './Icons/InfoSvg';
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
    const rerender = useReducer(() => ({}), {})[1];
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const heightRef = useRef<number | undefined>(undefined);

    const [hover, setHover] = useState(false);
    const { type, message, duration, dispose, placement } = item;
    const Icon = type ? typeIcon[type] : undefined;

    //
    const { status, leave, onAnimationEnd } = useAnimate({
        autoEnter: true,
        beforeEnter: () => {
            if (itemRef.current) heightRef.current = itemRef.current.clientHeight;
            rerender();
        },
        afterEnter: () => {
            heightRef.current = undefined;
            rerender();
        },
        beforeLeave: () => {
            if (itemRef.current) heightRef.current = itemRef.current.clientHeight;
            rerender();
        },
        afterLeave: () => {
            dispose();
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
            onAnimationEnd={onAnimationEnd}
            style={{ height: heightRef.current }}
            className={classNames(styles['item-wrapper'], {
                [styles['first']]: first,
                [styles['top']]: placement.includes('top'),
                [styles['left']]: placement.includes('Left'),
                [styles['right']]: placement.includes('Right'),
                [styles['bottom']]: placement.includes('bottom'),
                [styles['enter']]: status === 'Enter',
                [styles['leave']]: status === 'Leave',
                [styles['before-enter']]: status === 'BeforeEnter',
            })}
        >
            <div ref={itemRef} className={styles['item']} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {Icon && (
                    <div className={styles['icon']}>
                        <Icon />
                    </div>
                )}
                <div className={styles['message']}>{message}</div>
                <div className={styles['close-x']} onClick={leave}>
                    <CloseSvg />
                </div>
            </div>
        </div>
    );
};

export default Item;
