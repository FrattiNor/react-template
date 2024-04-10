import { useRef, useState } from 'react';

import { nanoid } from 'nanoid';

import type { AutoModals, ModalData } from './type';

const useProvider = <M extends AutoModals>() => {
    const midStr = '#_#_#';
    const dataRef = useRef<Record<string, any>>({});
    const [modalVisible, setModalVisible] = useState<Record<string, boolean>>({});

    const parseKeyId = (keyId: string) => {
        const keyIdList = keyId.split(midStr);
        return { key: keyIdList[0], id: keyIdList[1] };
    };

    const stringifyKeyId = <K extends keyof M>(key: K, id: string) => {
        return [key, id].join(midStr);
    };

    // 打开对应key的Modal
    const openModal = <K extends keyof M>(key: K, data: ModalData<M[K]>) => {
        const id = nanoid();
        const _key = stringifyKeyId(key, id);

        dataRef.current = {
            ...dataRef.current,
            [_key]: data,
        };

        setModalVisible((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            nextDisplay[_key] = true;
            return nextDisplay;
        });

        return { key, id };
    };

    // 销毁对应key的Modal
    const destroyModal = <K extends keyof M>(key: K, id: string) => {
        const _key = stringifyKeyId(key, id);

        delete dataRef.current[_key];

        setModalVisible((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            delete nextDisplay[_key];
            return nextDisplay;
        });

        return { key, id };
    };

    return {
        openModal,
        parseKeyId,
        destroyModal,
        stringifyKeyId,
        modalVisible,
        setModalVisible,
        modalData: dataRef.current,
    };
};

export default useProvider;
