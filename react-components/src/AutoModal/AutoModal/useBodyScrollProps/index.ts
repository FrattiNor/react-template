import classNames from 'classnames';

import styles from './index.module.less';
import type { ModalProps } from 'antd';

const useBodyScrollProps = (props: ModalProps, noBodyScroll?: boolean) => {
    const modalProps: ModalProps = {
        ...props,
        className: classNames(styles['body-scroll-wrapper'], props.className),
        styles: {
            content: { padding: 0, ...props.styles?.content },
            header: { padding: '20px 24px 0 24px', ...props.styles?.header },
            footer: { padding: '0 24px 20px 24px', ...props.styles?.footer },
            body: props.styles?.body,
        },
        classNames: {
            header: props.classNames?.header,
            footer: props.classNames?.footer,
            content: classNames(styles['body-scroll-content'], props.classNames?.content),
            body:
                noBodyScroll !== true
                    ? classNames(styles['body-scroll'], props.classNames?.body)
                    : classNames(styles['no-body-scroll'], props.classNames?.body),
        },
    };

    return modalProps;
};

export default useBodyScrollProps;
