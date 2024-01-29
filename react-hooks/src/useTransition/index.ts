import { useReducer, useLayoutEffect } from 'react';

type Props = {
    autoStart?: boolean;
    beforeTransition?: () => void;
    afterTransition?: () => void;
};

const useAnimate = (props: Props) => {
    const rerender = useReducer(() => ({}), {})[1];

    const { beforeTransition, afterTransition, autoStart } = props;

    const onTransitionEnd = () => {
        if (afterTransition) afterTransition();
        rerender();
    };

    const start = () => {
        if (beforeTransition) beforeTransition();
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

export default useAnimate;
