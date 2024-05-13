import type { ModalProps } from 'antd';

const useHeaderBordered = (props: ModalProps, headerBordered?: boolean) => {
    const modalProps: ModalProps = {
        ...props,
        styles: {
            header: props.styles?.header,
            footer: props.styles?.footer,
            content: props.styles?.content,
            body: headerBordered ? { borderTop: '1px solid var(--theme-second-border)', ...props.styles?.body } : props.styles?.body,
        },
    };

    return modalProps;
};

export default useHeaderBordered;
