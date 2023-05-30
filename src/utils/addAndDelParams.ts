import { Dispatch, SetStateAction } from 'react';

const getAddAndDelParams =
    (setParams: Dispatch<SetStateAction<Record<string, any>>>) =>
    ({ add, del }: { add?: Record<string, any>; del?: string[] }) => {
        setParams((beforeParams) => {
            let nextParams = { ...beforeParams };
            if (del) del.forEach((key) => delete nextParams[key]);
            if (add) nextParams = { ...nextParams, ...add };
            return { ...nextParams };
        });
    };

export default getAddAndDelParams;
