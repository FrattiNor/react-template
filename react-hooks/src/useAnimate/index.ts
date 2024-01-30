import { useRef, useReducer, useLayoutEffect } from 'react';

type Status = 'BeforeEnter' | 'Entering' | 'AfterEnter' | 'Leaving' | 'AfterLeave';

type Props = {
    autoEnter?: boolean;
    beforeEnter?: () => void;
    onEnter?: () => void;
    afterEnter?: () => void;
    beforeLeave?: () => void;
    onLeave?: () => void;
    afterLeave?: () => void;
};

const useAnimate = (props: Props) => {
    const rerender = useReducer(() => ({}), {})[1];
    const statusRef = useRef<Status | null>('BeforeEnter');
    const { autoEnter, beforeEnter, onEnter, afterEnter, beforeLeave, onLeave, afterLeave } = props;

    const onAnimationEnd: React.AnimationEventHandler<HTMLElement> = (e) => {
        if (e.currentTarget === e.target) {
            if (statusRef.current === 'Entering') {
                statusRef.current = 'AfterEnter';
                if (afterEnter) afterEnter();
                rerender();
            }
            if (statusRef.current === 'Leaving') {
                statusRef.current = 'AfterLeave';
                if (afterLeave) afterLeave();
                rerender();
            }
        }
    };

    const onAnimationStart: React.AnimationEventHandler<HTMLElement> = (e) => {
        if (e.currentTarget === e.target) {
            if (statusRef.current === 'Entering') {
                if (onEnter) onEnter();
            }
            if (statusRef.current === 'Leaving') {
                if (onLeave) onLeave();
            }
        }
    };

    const enter = () => {
        if (statusRef.current === 'BeforeEnter') {
            if (beforeEnter) beforeEnter();
            statusRef.current = 'Entering';
            rerender();
        }
    };

    const leave = () => {
        if (statusRef.current === 'AfterEnter') {
            if (beforeLeave) beforeLeave();
            statusRef.current = 'Leaving';
            rerender();
        }
    };

    const resetStatus = () => {
        statusRef.current === 'BeforeEnter';
        rerender();
    };

    useLayoutEffect(() => {
        if (autoEnter === true) {
            enter();
        }
    }, []);

    return {
        enter,
        leave,
        resetStatus,
        listeners: { onAnimationEnd, onAnimationStart },
        statusStr: statusRef.current,
        status: {
            beforeEnter: statusRef.current === 'BeforeEnter',
            isEntering: statusRef.current === 'Entering',
            afterEnter: statusRef.current === 'AfterEnter',
            isLeaving: statusRef.current === 'Leaving',
            afterLeave: statusRef.current === 'AfterLeave',
        },
    };
};

export default useAnimate;
