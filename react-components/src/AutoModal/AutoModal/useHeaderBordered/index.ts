import type { ModalProps } from 'antd';

const useHeaderBordered = (props: ModalProps, headerBordered?: boolean) => {
    const modalProps: ModalProps = {
        ...props,
        styles: {
            footer: props.styles?.footer,
            content: props.styles?.content,
            body: headerBordered ? { borderTop: '1px solid var(--theme-second-border)', ...props.styles?.body } : props.styles?.body,
            header: headerBordered ? { padding: '16px  24px 4px 24px', ...props.styles?.header } : props.styles?.header,
        },
    };

    return modalProps;
};

export default useHeaderBordered;
