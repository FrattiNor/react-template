import { FC } from 'react';

import { useCurrentAutoModal } from '../AutoModalRender';
import Modal from '../Modal';
import { ModalProps } from '../type';

const AutoModal: FC<ModalProps> = (props) => {
    const { destroyModal, visible, setVisible } = useCurrentAutoModal();

    const _visible = props.visible ?? visible;

    const _setVisible = props.onVisibleChange ?? setVisible;

    const afterClose = () => {
        if (typeof props.afterClose === 'function') props.afterClose();
        destroyModal();
    };

    return <Modal {...props} visible={_visible} onVisibleChange={_setVisible} afterClose={afterClose} />;
};

export default AutoModal;
