import { useRef, useState } from 'react';
import { nanoid } from 'nanoid';

type ModalData = Record<string, any>;

type ModalVisible = Record<string, Record<string, boolean>>;

const useProvider = () => {
    const dataRef = useRef<ModalData>({});
    const [modalVisible, setModalVisible] = useState<ModalVisible>({});

    // 打开对应key的Modal
    const openModal = ({ key, data }: { key: string; data: any }) => {
        const id = nanoid();

        dataRef.current = {
            ...dataRef.current,
            [id]: data,
        };

        setModalVisible((oldVisible) => {
            const nextVisible = { ...oldVisible };
            if (!nextVisible[key]) nextVisible[key] = {};
            nextVisible[key][id] = true;
            return nextVisible;
        });
    };

    // 关闭对应key的Modal
    const closeModal = ({ key, id }: { key: string; id: string }) => {
        delete dataRef.current[id];

        setModalVisible((oldVisible) => {
            const nextVisible = { ...oldVisible };
            if (!nextVisible[key]) nextVisible[key] = {};
            delete nextVisible[key][id];
            if (Object.keys(nextVisible[key]).length === 0) delete nextVisible[key];
            return nextVisible;
        });
    };

    // 前置Modal
    const preModal = ({ key, id }: { key: string; id: number }) => {
        setModalVisible((oldVisible) => {
            const nextVisible = { ...oldVisible };
            if (!nextVisible[key]) nextVisible[key] = {};
            const current = nextVisible[key][id];
            if (current) {
                nextVisible[key] = { ...nextVisible[key] };
                nextVisible[key][id] = current;
            }
            return nextVisible;
        });
    };

    // 获取显示的modal的ids
    const getModalVisibleIds = (key: string) => {
        return Object.keys(modalVisible[key] ?? {});
    };

    // 根据id获取modal的data
    const getModalDataById = (id: string) => {
        return dataRef.current[id];
    };

    return {
        preModal,
        openModal,
        closeModal,
        getModalDataById,
        getModalVisibleIds,
    };
};

export default useProvider;
