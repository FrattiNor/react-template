import { useAutoModalProvider } from '../AutoModalProvider';

const useProvider = ({ key, id }: { key: string; id: string }) => {
    const { closeModal, stringifyKeyId, modalData } = useAutoModalProvider();

    const keyId = stringifyKeyId(key, id);

    const data = modalData[keyId];

    const _closeModal = () => {
        closeModal(key, id);
    };

    return {
        data,
        closeModal: _closeModal,
    };
};

export default useProvider;
