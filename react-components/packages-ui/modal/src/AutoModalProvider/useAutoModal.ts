import { useContext, useEffect, useRef } from 'react';

import Context, { ContextProps } from './Context';
import { ModalData } from './useProvider';
import { AutoModals } from '../type';

const useAutoModal = <M extends AutoModals>() => {
    const currentOpened = useRef<Record<string, boolean>>({});
    const { openModal, destroyModal, closeModal, parseKeyId, stringifyKeyId, ...rest } = useContext<ContextProps<M>>(Context as any);

    const _openModal = <K extends keyof M>(key: K, data: ModalData<M[K]>) => {
        const openRes = openModal(key, data);
        currentOpened.current = { ...currentOpened.current, [stringifyKeyId(openRes.key, openRes.id)]: true };
    };

    const _destroyModal = <K extends keyof M>(key: K, id: string) => {
        destroyModal(key, id);
        delete currentOpened.current[stringifyKeyId(key, id)];
    };

    // 取消挂载时将当前打开的modal关闭
    useEffect(() => {
        return () => {
            Object.entries(currentOpened.current).forEach(([keyAndId]) => {
                const { key, id } = parseKeyId(keyAndId);
                closeModal(key, id);
            });
        };
    }, []);

    return {
        closeModal,
        parseKeyId,
        stringifyKeyId,
        openModal: _openModal,
        destroyModal: _destroyModal,
        ...rest,
    };
};

export default useAutoModal;
