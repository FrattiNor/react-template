import { NotificationConfProps, NotificationPlacement } from './type';

class NotificationConf {
    constructor(props?: NotificationConfProps) {
        const { zIndex, maxCount, duration, placement, getContainer } = props || {};
        this.zIndex = zIndex ?? 99999;
        this.duration = duration ?? 5000;
        this.maxCount = maxCount ?? Infinity;
        this.placement = placement ?? 'topRight';
        this.getContainer = getContainer ?? (() => document.body);
    }

    zIndex: number;
    maxCount: number;
    duration: number;
    placement: NotificationPlacement;
    getContainer: () => HTMLElement | undefined;

    setConfig(props: Partial<NotificationConfProps>) {
        const { zIndex, maxCount, duration, placement, getContainer } = props;
        this.zIndex = zIndex ?? this.zIndex;
        this.maxCount = maxCount ?? this.maxCount;
        this.duration = duration ?? this.duration;
        this.placement = placement ?? this.placement;
        this.getContainer = getContainer ?? this.getContainer;
    }
}

export default NotificationConf;
