import { useAutoModal } from '../AutoModalProvider';

const useProvider = (keyId: string) => {
    const { closeModal, parseKeyId, modalData } = useAutoModal();

    const data = modalData[keyId];

    const _closeModal = () => {
        const { key, id } = parseKeyId(keyId);
        closeModal(key, id);
    };

    return {
        data,
        closeModal: _closeModal,
    };
};

export default useProvider;
