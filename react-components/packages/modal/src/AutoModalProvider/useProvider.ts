import { ModalProviderProps } from '../type';
import { useRef, useState } from 'react';
import { nanoid } from 'nanoid';

type ModalData = Record<string, any>;

type ModalDisplay = Record<string, boolean>;

const useProvider = ({ modals }: ModalProviderProps) => {
    const midStr = '#_#_#';
    const dataRef = useRef<ModalData>({});
    const [modalDisplay, setModalDisplay] = useState<ModalDisplay>({});

    const parseKeyId = (keyId: string) => {
        const keyIdList = keyId.split(midStr);
        return { key: keyIdList[0], id: keyIdList[1] };
    };

    const stringifyKeyId = ({ key, id }: { key: string; id: string }) => {
        return [key, id].join(midStr);
    };

    // 打开对应key的Modal
    const openModal = ({ key, data }: { key: string; data: any }) => {
        const id = nanoid();

        dataRef.current = {
            ...dataRef.current,
            [id]: data,
        };

        setModalDisplay((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            nextDisplay[stringifyKeyId({ key, id })] = true;
            return nextDisplay;
        });
    };

    // 关闭对应key的Modal
    const closeModal = ({ key, id }: { key: string; id: string }) => {
        delete dataRef.current[id];

        setModalDisplay((oldDisplay) => {
            const nextDisplay = { ...oldDisplay };
            delete nextDisplay[stringifyKeyId({ key, id })];
            return nextDisplay;
        });
    };

    // 前置Modal
    const preModal = ({ key, id }: { key: string; id: string }) => {
        setModalDisplay((oldDisplay) => {
            const keyId = stringifyKeyId({ key, id });
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
        modalData: dataRef.current,
    };
};

export default useProvider;
