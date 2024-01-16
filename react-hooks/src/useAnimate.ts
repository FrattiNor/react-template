import { useEffect, useRef } from 'react';

type Status = 'BeforeEnter' | 'Enter' | 'BeforeLeave' | 'Leave' | 'AfterLeave';

type Props = {
    autoEnter?: boolean;
    beforeEnter?: () => void;
    afterEnter?: () => void;
    beforeLeave?: () => void;
    afterLeave?: () => void;
};

const useAnimate = (props: Props) => {
    // const rerender = useReducer(() => ({}), {})[1];
    const statusRef = useRef<Status>('BeforeEnter');

    const { autoEnter, beforeEnter, afterEnter, beforeLeave, afterLeave } = props;

    const onAnimationEnd = () => {
        if (statusRef.current === 'Enter') {
            if (afterEnter) afterEnter();
            statusRef.current = 'BeforeLeave';
            // rerender();
        }
        if (statusRef.current === 'Leave') {
            if (afterLeave) afterLeave();
            statusRef.current = 'AfterLeave';
            // rerender();
        }
    };

    const enter = () => {
        if (statusRef.current === 'BeforeEnter') {
            if (beforeEnter) beforeEnter();
            statusRef.current = 'Enter';
            // rerender();
        }
    };

    const leave = () => {
        if (statusRef.current === 'BeforeLeave') {
            if (beforeLeave) beforeLeave();
            statusRef.current = 'Leave';
            // rerender();
        }
    };

    useEffect(() => {
        if (autoEnter === true) {
            enter();
        }
    }, []);

    return { onAnimationEnd, enter, leave, status: statusRef.current };
};

export default useAnimate;
