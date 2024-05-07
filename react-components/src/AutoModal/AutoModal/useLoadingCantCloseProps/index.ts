import type { ModalProps } from 'antd';

const useLoadingCantCloseProps = (props: ModalProps) => {
    // 如果confirmLoading，不能关闭modal
    const cancelButtonProps = { disabled: props.confirmLoading, ...props.cancelButtonProps };
    const closable = typeof props.closable === 'boolean' || props.closable ? props.closable : !props.confirmLoading;
    const maskClosable = typeof props.maskClosable === 'boolean' ? props.maskClosable : !props.confirmLoading;

    const modalProps: ModalProps = {
        ...props,
        cancelButtonProps,
        closable,
        maskClosable,
    };

    return modalProps;
};

export default useLoadingCantCloseProps;
