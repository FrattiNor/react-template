import { type CSSProperties, type FC } from 'react';

import { Modal, type ModalProps } from 'antd';

import useAfterClose from './_hooks/useAfterClose';
import useBodyScrollProps from './_hooks/useBodyScrollProps';
import useBodyStyleProps from './_hooks/useBodyStyleProps';
import useHeaderBordered from './_hooks/useHeaderBordered';
import useLoadingCantCloseProps from './_hooks/useLoadingCantCloseProps';
import useModalStyle from './_hooks/useModalStyle';
import FullWindowModal from './FullWindowModal';
import MoveableModal from './MoveableModal';
import { useCurrentModal } from '../AutoModalRender';

export type AutoModalProps = Omit<ModalProps, 'modalRender' | 'bodyStyle'> & {
	draggable?: boolean;
	fullWindow?: boolean;
	bodyScroll?: 'none' | 'normal' | 'stable';
	headerBordered?: boolean;
	bodyStyle?: CSSProperties;
};

const AutoModal: FC<AutoModalProps> = (props) => {
	const { fullWindow, draggable = true, bodyScroll, bodyStyle, headerBordered, ...modalProps } = props;

	const { visible, closeModal, destroyModal } = useCurrentModal();

	// modal 一些自定义基础style
	const modalProps1 = useModalStyle(modalProps);

	// confirmLoading 时无法关闭 modal
	const modalProps2 = useLoadingCantCloseProps(modalProps1);

	// body滚动样式
	const modalProps3 = useBodyScrollProps(modalProps2, bodyScroll);

	// 兼容 bodyStyle 参数
	const modalProps4 = useBodyStyleProps(modalProps3, bodyStyle);

	// 增加 header 和 body 之间隔断线条
	const modalProps5 = useHeaderBordered(modalProps4, headerBordered);

	// afterClose 增加 destroyModal
	const modalProps6 = useAfterClose(modalProps5, destroyModal);

	const modalProps7: ModalProps = {
		destroyOnClose: true,
		open: visible,
		centered: true,
		onCancel: closeModal,
		...modalProps6,
		maskClosable: false,
	};

	if (fullWindow === true) return <FullWindowModal {...modalProps7} />;

	if (draggable === true) return <MoveableModal {...modalProps7} />;

	return <Modal {...modalProps7} />;
};

export default AutoModal;
