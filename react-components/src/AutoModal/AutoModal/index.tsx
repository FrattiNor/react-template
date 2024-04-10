import type { CSSProperties, FC } from 'react';

import { Modal } from 'antd';

import FullWindowModal from './FullWindowModal';
import MoveableModal from './MoveableModal';
import useBodyScrollProps from './useBodyScrollProps';
import useBodyStyleProps from './useBodyStyleProps';
import useHeaderBordered from './useHeaderBordered';
import useLoadingCantCloseProps from './useLoadingCantCloseProps';
import { useCurrentModal } from '../AutoModalRender';
import type { ModalProps } from 'antd';

type Props = Omit<ModalProps, 'modalRender' | 'bodyStyle'> & {
    draggable?: boolean;
    fullWindow?: boolean;
    noBodyScroll?: boolean;
    headerBordered?: boolean;
    bodyStyle?: CSSProperties;
};

const AutoModal: FC<Props> = (props) => {
    const { fullWindow, draggable = true, noBodyScroll, bodyStyle, headerBordered, ...modalProps } = props;

    const { visible, closeModal, destroyModal } = useCurrentModal();

    const modalProps1 = useLoadingCantCloseProps(modalProps);

    const modalProps2 = useBodyScrollProps(modalProps1, noBodyScroll);

    const modalProps3 = useBodyStyleProps(modalProps2, bodyStyle);

    const modalProps4 = useHeaderBordered(modalProps3, headerBordered);

    const modalProps5: ModalProps = {
        destroyOnClose: true,
        open: visible,
        centered: true,
        onCancel: closeModal,
        afterClose: destroyModal,
        ...modalProps4,
        maskClosable: false,
    };

    if (fullWindow === true) return <FullWindowModal {...modalProps5} />;

    if (draggable === true) return <MoveableModal {...modalProps5} />;

    return <Modal {...modalProps5} />;
};

export default AutoModal;
