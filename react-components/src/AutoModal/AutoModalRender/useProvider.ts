import { useAutoModal } from '../AutoModalProvider';

const useProvider = (keyId: string) => {
	const { destroyModal, parseKeyId, modalVisible, setModalVisible } = useAutoModal();

	const visible = modalVisible[keyId];

	const setVisible = (v: boolean) => {
		setModalVisible((old) => ({ ...old, [keyId]: v }));
	};

	const _destroyModal = () => {
		const { key, id } = parseKeyId(keyId);
		destroyModal(key, id);
	};

	const closeModal = () => {
		setVisible(false);
	};

	return {
		visible,
		setVisible,
		closeModal,
		destroyModal: _destroyModal,
	};
};

export default useProvider;
