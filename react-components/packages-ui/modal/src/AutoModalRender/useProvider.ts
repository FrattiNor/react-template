import { useAutoModal } from '../AutoModalProvider';

const useProvider = (keyId: string) => {
    const { destroyModal, closeModal, parseKeyId, modalVisible, setModalVisible, modalData } = useAutoModal();

    const data = modalData[keyId];

    const visible = modalVisible[keyId];

    const setVisible = (v: boolean) => {
        setModalVisible((old) => ({ ...old, [keyId]: v }));
    };

    const _destroyModal = () => {
        const { key, id } = parseKeyId(keyId);
        destroyModal(key, id);
    };

    const _closeModal = () => {
        const { key, id } = parseKeyId(keyId);
        closeModal(key, id);
    };

    return {
        data,
        visible,
        setVisible,
        closeModal: _closeModal,
        destroyModal: _destroyModal,
    };
};

export default useProvider;
