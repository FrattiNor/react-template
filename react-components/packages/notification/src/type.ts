export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type NotificationProps = {
    message: string;
    duration?: number;
    type?: NotificationType;
    placement?: NotificationPlacement;
};

export type NotificationConfProps = {
    zIndex?: number;
    maxCount?: number;
    duration?: number;
    placement?: NotificationPlacement;
    getContainer?: () => HTMLElement | undefined;
};

export type NotificationRenderQueenItem = {
    key: string;
    message: string;
    duration: number;
    destroy: () => void;
    type?: NotificationType;
    placement: NotificationPlacement;
};