import { useCurrentAutoModal } from '../AutoModalRender';
import useMergeState from '@react/hooks/useMergeState';
import { ModalProps } from '../type';
import Modal from '../Modal';
import { FC } from 'react';

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
