import { useAutoModalRender } from '../AutoModalRender';
import { useMergeState } from '@react/hooks';
import { ModalProps } from '../type';
import Modal from '../Modal';
import { FC } from 'react';

const AutoModal: FC<ModalProps> = (props) => {
    const { closeModal } = useAutoModalRender();

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
