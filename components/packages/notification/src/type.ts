export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type NotificationProps = {
    message: string;
    type: NotificationType;
};
