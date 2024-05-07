import type { CSSProperties, FC } from 'react';

import { Modal } from 'antd';

import FullWindowModal from './FullWindowModal';
import MoveableModal from './MoveableModal';
import useBodyScrollProps from './useBodyScrollProps';
import useBodyStyleProps from './useBodyStyleProps';
import useHeaderBordered from './useHeaderBordered';
import useLoadingCantCloseProps from './useLoadingCantCloseProps';
import useModalStyle from './useModalStyle';
import { useCurrentModal } from '../AutoModalRender';

import type { ModalProps } from 'antd';

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

    const modalProps6: ModalProps = {
        destroyOnClose: true,
        open: visible,
        centered: true,
        onCancel: closeModal,
        afterClose: destroyModal,
        ...modalProps5,
        maskClosable: false,
    };

    if (fullWindow === true) return <FullWindowModal {...modalProps6} />;

    if (draggable === true) return <MoveableModal {...modalProps6} />;

    return <Modal {...modalProps6} />;
};

export default AutoModal;
