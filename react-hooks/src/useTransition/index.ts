import { useReducer, useLayoutEffect, useRef } from 'react';

type Status = 'BeforeTransition' | 'Transitioning' | 'AfterTransition';

type Props = {
    autoStart?: boolean;
    beforeTransition?: () => void;
    afterTransition?: () => void;
};

const useTransition = (props: Props) => {
    const rerender = useReducer(() => ({}), {})[1];
    const statusRef = useRef<Status | null>('BeforeTransition');
    const { beforeTransition, afterTransition, autoStart } = props;

    const onTransitionEnd: React.TransitionEventHandler<HTMLElement> = (e) => {
        if (e.currentTarget === e.target) {
            if (statusRef.current === 'Transitioning') {
                statusRef.current = 'AfterTransition';
                if (afterTransition) afterTransition();
                rerender();
            }
        }
    };

    const start = () => {
        if (beforeTransition) beforeTransition();
        statusRef.current = 'Transitioning';
        rerender();
    };

    useLayoutEffect(() => {
        if (autoStart === true) {
            start();
        }
    }, []);

    return {
        start,
        listeners: { onTransitionEnd },
    };
};

export default useTransition;
