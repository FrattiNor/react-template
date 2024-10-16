import { type ModalProps } from 'antd';

const useAfterClose = (props: ModalProps, destroyModal: () => void) => {
	const modalProps: ModalProps = {
		...props,
		afterClose: () => {
			if (typeof props.afterClose === 'function') props.afterClose();
			destroyModal();
		},
	};

	return modalProps;
};

export default useAfterClose;
