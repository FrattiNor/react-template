import { Toast as AntdToast, ToastShowProps } from 'antd-mobile';
import { ToastHandler } from 'antd-mobile/es/components/toast';
import { ReactNode } from 'react';

const ToastFn = (props: ToastShowProps | string) => {
    const contentWrapper = (n: ReactNode) => {
        if (typeof n === 'string') {
            return <div style={{ textAlign: 'center' }}>{n}</div>;
        }
        return n;
    };

    const toastProps = typeof props === 'string' ? { content: contentWrapper(props) } : { ...props, content: contentWrapper(props.content) };

    return AntdToast.show(toastProps);
};

const getToast = () => {
    const toastType = ['success', 'fail', 'loading'] as const;

    type ToastType = (typeof toastType)[number];

    type Toast = Record<ToastType, (str: string) => ToastHandler>;

    const map: Toast = {} as Toast;

    toastType.forEach((type) => {
        map[type] = (str: string) => ToastFn({ icon: type, content: str });
    });

    return map;
};

const Toast = getToast();

export { ToastFn };
export default Toast;
