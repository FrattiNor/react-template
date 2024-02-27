import { ComponentType, LazyExoticComponent, useRef, useState } from 'react';

import { nanoid } from 'nanoid';

import { AutoModals } from '../type';

export type ModalData<T> = T extends LazyExoticComponent<ComponentType<infer R>> ? R : never;

const useProvider = <M extends AutoModals>({ modals }: { modals?: M }) => {
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

        dataRef.current = {
            ...dataRef.current,
            [id]: data,
        };

        setModalVisible((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            nextDisplay[stringifyKeyId(key, id)] = true;
            return nextDisplay;
        });

        return { key, id };
    };

    // 关闭对应key的Modal
    const closeModal = <K extends keyof M>(key: K, id: string) => {
        setModalVisible((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            nextDisplay[stringifyKeyId(key, id)] = false;
            return nextDisplay;
        });

        return { key, id };
    };

    // 销毁对应key的Modal
    const destroyModal = <K extends keyof M>(key: K, id: string) => {
        delete dataRef.current[id];

        setModalVisible((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            delete nextDisplay[stringifyKeyId(key, id)];
            return nextDisplay;
        });

        return { key, id };
    };

    return {
        modals,
        openModal,
        closeModal,
        parseKeyId,
        destroyModal,
        modalVisible,
        stringifyKeyId,
        setModalVisible,
        modalData: dataRef.current,
    };
};

export default useProvider;
