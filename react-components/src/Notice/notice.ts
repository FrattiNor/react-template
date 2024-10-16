import { notification } from 'antd';
import { type ArgsProps, type NotificationInstance } from 'antd/es/notification/interface';

import styles from './notice.module.less';

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

export default notice;
