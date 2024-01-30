import { FC } from 'react';

import { useMergeState } from '@react/hooks';

import { useCurrentAutoModal } from '../AutoModalRender';
import Modal from '../Modal';
import { ModalProps } from '../type';

const AutoModal: FC<ModalProps> = (props) => {
    const { closeModal } = useCurrentAutoModal();

    const [visible, onVisibleChange] = useMergeState({
        defaultValue: true,
        state: props.visible,
        setState: props.onVisibleChange,
    });

    const afterClose = () => {
        if (typeof props.afterClose === 'function') props.afterClose();
        closeModal();
    };

    return <Modal {...props} visible={visible} onVisibleChange={onVisibleChange} afterClose={afterClose} />;
};

export default AutoModal;
