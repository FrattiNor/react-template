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

    const {
        width,
        style,
        title,
        footer,
        children,
        className,
        headStyle,
        bodyStyle,
        footStyle,
        closeable,
        headBorder,
        footBorder,
        cancelText,
        afterClose,
        confirmText,
        fillUpWindow,
        confirmLoading,
        closeableByConfirmLoading,
    } = props;

    return (
        <Fragment>
            {(() => {
                if (display) {
                    const container = getContainer();

                    return createPortal(
                        <Overlay
                            title={title}
                            width={width}
                            style={style}
                            footer={footer}
                            visible={visible}
                            children={children}
                            closeable={closeable}
                            headStyle={headStyle}
                            bodyStyle={bodyStyle}
                            footStyle={footStyle}
                            className={className}
                            setVisible={setVisible}
                            cancelText={cancelText}
                            headBorder={headBorder}
                            footBorder={footBorder}
                            confirmText={confirmText}
                            fillUpWindow={fillUpWindow}
                            confirmLoading={confirmLoading}
                            closeableByConfirmLoading={closeableByConfirmLoading}
                            afterClose={() => {
                                if (typeof afterClose === 'function') afterClose();
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
