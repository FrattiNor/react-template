import { useEffect, useRef, useReducer } from 'react';

type Status = 'BeforeEnter' | 'Enter' | 'AfterEnter' | 'Leave' | 'AfterLeave';

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

    const onAnimationEnd = () => {
        if (statusRef.current === 'Enter') {
            if (afterEnter) afterEnter();
            statusRef.current = 'AfterEnter';
            rerender();
        }
        if (statusRef.current === 'Leave') {
            if (afterLeave) afterLeave();
            statusRef.current = 'AfterLeave';
            rerender();
        }
    };

    const onAnimationStart = () => {
        if (statusRef.current === 'Enter') {
            if (onEnter) onEnter();
        }
        if (statusRef.current === 'Leave') {
            if (onLeave) onLeave();
        }
    };

    const enter = () => {
        if (statusRef.current === 'BeforeEnter') {
            if (beforeEnter) beforeEnter();
            statusRef.current = 'Enter';
            rerender();
        }
    };

    const leave = () => {
        if (statusRef.current === 'AfterEnter') {
            if (beforeLeave) beforeLeave();
            statusRef.current = 'Leave';
            rerender();
        }
    };

    useEffect(() => {
        if (autoEnter === true) {
            enter();
        }
    }, []);

    return {
        enter,
        leave,
        listeners: { onAnimationEnd, onAnimationStart },
        statusStr: statusRef.current,
        status: {
            beforeEnter: statusRef.current === 'BeforeEnter',
            isEnter: statusRef.current === 'Enter',
            afterEnter: statusRef.current === 'AfterEnter',
            isLeave: statusRef.current === 'Leave',
            afterLeave: statusRef.current === 'AfterLeave',
        },
    };
};

export default useAnimate;
