import { Dispatch, useLayoutEffect, useState } from 'react';
import useMergeState from '../useMergeState';

type Props = {
    visible?: boolean;
    setVisible?: Dispatch<boolean>;
};

const useDisplayVisible = (props: Props) => {
    const [display, setDisplay] = useState(false);

    const [visible, setVisible] = useMergeState({
        defaultValue: false,
        state: props.visible,
        setState: props.setVisible,
    });

    useLayoutEffect(() => {
        if (visible === true) {
            setDisplay(true);
        }
    }, [visible]);

    return { display, visible, setVisible, setDisplay };
};

export default useDisplayVisible;
