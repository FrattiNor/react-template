/* eslint-disable react-refresh/only-export-components */
import type { FC, PropsWithChildren } from 'react';
import { Fragment, useLayoutEffect } from 'react';

import { App, notification } from 'antd';

import styles from './index.module.less';
import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';

class Notice {
    notification: NotificationInstance = notification;

    setNotification(notification: NotificationInstance) {
        this.notification = notification;
    }

    success(props: string | ArgsProps) {
        this.notification.success(typeof props === 'string' ? { message: props, className: styles['notification'] } : props);
    }

    warning(props: string | ArgsProps) {
        this.notification.warning(typeof props === 'string' ? { message: props, className: styles['notification'] } : props);
    }

    info(props: string | ArgsProps) {
        this.notification.info(typeof props === 'string' ? { message: props, className: styles['notification'] } : props);
    }

    error(props: string | ArgsProps) {
        this.notification.error(typeof props === 'string' ? { message: props, className: styles['notification'] } : props);
    }
}

const notice = new Notice();

const NoticeProvider: FC<PropsWithChildren> = ({ children }) => {
    const staticFunction = App.useApp();

    useLayoutEffect(() => {
        notice.setNotification(staticFunction.notification);
    }, []);

    return <Fragment>{children}</Fragment>;
};

export { NoticeProvider, notice };
