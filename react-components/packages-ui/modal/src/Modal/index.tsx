import { FC, Fragment } from 'react';
import { createPortal } from 'react-dom';

import { useDisplayVisible, useContainer } from '@react/hooks';

import Overlay from './Overlay';
import { ModalProps } from '../type';

const Modal: FC<ModalProps> = (props) => {
    const { getContainer, clearContainer } = useContainer({ getContainer: props.getContainer });

    const { display, visible, setVisible, setDisplay } = useDisplayVisible({
        visible: props.visible,
        setVisible: props.onVisibleChange,
    });

    return (
        <Fragment>
            {(() => {
                if (display) {
                    const container = getContainer();

                    return createPortal(
                        <Overlay
                            {...props}
                            visible={visible}
                            setVisible={setVisible}
                            afterClose={() => {
                                if (typeof props.afterClose === 'function') props.afterClose();
                                clearContainer();
                                setDisplay(false);
                            }}
                        />,
                        container,
                    );
                }
            })()}
        </Fragment>
    );
};

export default Modal;
