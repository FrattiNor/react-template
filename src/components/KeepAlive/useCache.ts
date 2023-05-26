import { useActivate, useAliveController, useUnactivate } from 'react-activation';
import { useCallback, useRef } from 'react';

const useCache = ({ name }: { name: string }) => {
    const when = useRef(false);

    const controller = useAliveController();

    useActivate(() => {
        console.log('useActivate');
        console.log(controller.getCachingNodes());
        controller.dropScope(name);
    });

    useUnactivate(() => {
        if (!when.current) {
            console.log('useUnactivate');
            console.log(controller.getCachingNodes());
            controller.dropScope(name);
            console.log(controller.getCachingNodes());
        }
    });

    const setCache = useCallback((v: boolean) => {
        when.current = v;
    }, []);

    return { setCache };
};

export default useCache;
