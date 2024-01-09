import { useState } from 'react';

const useHeadHover = () => {
    const [headHoverObj, setHeadHoverObj] = useState<Record<string, boolean>>({});

    const addHeadHover = (key: string) => {
        setHeadHoverObj({ [key]: true });
    };

    const removeHeadHover = (key: string) => {
        setHeadHoverObj((old) => {
            const nextOld = { ...old };
            delete nextOld[key];
            return nextOld;
        });
    };

    return { headHoverObj, addHeadHover, removeHeadHover };
};

export default useHeadHover;
