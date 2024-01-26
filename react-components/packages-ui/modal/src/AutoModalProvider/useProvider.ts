import { ComponentType, LazyExoticComponent, useRef, useState } from 'react';
import { AutoModals } from '../type';
import { nanoid } from 'nanoid';

type ModalData<T> = T extends LazyExoticComponent<ComponentType<infer R>> ? R : never;

const useProvider = <M extends AutoModals>({ modals }: { modals: M }) => {
    const midStr = '#_#_#';
    const dataRef = useRef<Record<string, any>>({});
    const [modalDisplay, setModalDisplay] = useState<Record<string, boolean>>({});

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

        setModalDisplay((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            nextDisplay[stringifyKeyId(key, id)] = true;
            return nextDisplay;
        });
    };

    // 关闭对应key的Modal
    const closeModal = <K extends keyof M>(key: K, id: string) => {
        delete dataRef.current[id];

        setModalDisplay((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            delete nextDisplay[stringifyKeyId(key, id)];
            return nextDisplay;
        });
    };

    // 关闭相同key的Modal
    const closeSomeKModal = <K extends keyof M>(key: K) => {
        setModalDisplay((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };

            Object.keys(nextDisplay).forEach((displayKId) => {
                const parse = parseKeyId(displayKId);
                if (parse.key === key) {
                    delete dataRef.current[parse.id];
                    delete nextDisplay[displayKId];
                }
            });

            return nextDisplay;
        });
    };

    // 销毁所有Modal
    const destroyAllModal = () => {
        dataRef.current = {};
        setModalDisplay({});
    };

    // 前置Modal
    const preModal = <K extends keyof M>(key: K, id: string) => {
        setModalDisplay((oldDisplay) => {
            const keyId = stringifyKeyId(key, id);
            let nextDisplay = { ...oldDisplay };
            const current = nextDisplay[keyId];
            if (current) {
                const nextDisplayCopy = { ...nextDisplay };
                delete nextDisplayCopy[keyId];
                nextDisplay = {
                    [keyId]: current,
                    ...nextDisplayCopy,
                };
            }
            return nextDisplay;
        });
    };

    return {
        modals,
        preModal,
        openModal,
        closeModal,
        parseKeyId,
        modalDisplay,
        stringifyKeyId,
        destroyAllModal,
        closeSomeKModal,
        modalData: dataRef.current,
    };
};

export default useProvider;
