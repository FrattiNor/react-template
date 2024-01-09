import { useState } from 'react';

const useColHover = () => {
    const [colHoverObj, setColHoverObj] = useState<Record<string, boolean>>({});

    const addColHover = (key: string) => {
        setColHoverObj({ [key]: true });
    };

    const removeColHover = (key: string) => {
        setColHoverObj((old) => {
            const nextOld = { ...old };
            delete nextOld[key];
            return nextOld;
        });
    };

    return { colHoverObj, addColHover, removeColHover };
};

export default useColHover;
