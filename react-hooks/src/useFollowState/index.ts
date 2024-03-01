import { useEffect, useState } from 'react';

const useFollowState = <T>(state: T) => {
    const [innerState, setInnerState] = useState(state);

    useEffect(() => {
        if (innerState !== state) {
            setInnerState(state);
        }
    }, [state]);

    return [innerState, setInnerState] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export default useFollowState;
