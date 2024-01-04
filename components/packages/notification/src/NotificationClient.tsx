import { NotificationConfProps, NotificationProps, NotificationRenderQueenItem } from './type';
import NotificationConf from './NotificationConf';
import Notification from './Notification';
import ReactDOM from 'react-dom/client';

class NotificationClient {
    constructor(props?: NotificationConfProps) {
        this.config = new NotificationConf(props);
    }

    private renderQueen: Record<string, NotificationRenderQueenItem> = {};

    private renderDom = document.createElement('div');

    private reactDomRoot: ReactDOM.Root | null = null;

    config: NotificationConf;

    private mountReactDomRoot() {
        if (this.reactDomRoot !== null) {
            return this.reactDomRoot;
        }

        const container = this.config.getContainer() ?? document.body;

        try {
            container.removeChild(this.renderDom);
        } catch (e) {
            //
        }

        container.appendChild(this.renderDom);

        this.reactDomRoot = ReactDOM.createRoot(this.renderDom);

        return this.reactDomRoot;
    }

    private unmountReactDomRoot() {
        if (this.reactDomRoot) {
            this.reactDomRoot.unmount();
            this.reactDomRoot = null;

            const container = this.config.getContainer() ?? document.body;

            try {
                container.removeChild(this.renderDom);
            } catch (e) {
                //
            }
        }
    }

    private render() {
        if (Object.keys(this.renderQueen).length > 0) {
            const reactDomRoot = this.mountReactDomRoot();
            reactDomRoot.render(<Notification queen={this.renderQueen} zIndex={this.config.zIndex} maxCount={this.config.maxCount} />);
        } else {
            this.unmountReactDomRoot();
        }
    }

    setConfig(props: Partial<NotificationConfProps>) {
        this.config.setConfig(props);
    }

    open(props: NotificationProps) {
        const key = `${new Date().valueOf()}`;

        const item: NotificationRenderQueenItem = {
            key,
            type: props.type,
            message: props.message,
            duration: props.duration ?? this.config.duration,
            placement: props.placement ?? this.config.placement,
            dispose: () => {
                const newQueen = { ...this.renderQueen };
                delete newQueen[key];
                this.renderQueen = { ...newQueen };
                this.render();
            },
        };

        this.renderQueen = {
            ...this.renderQueen,
            [key]: item,
        };

        this.render();
    }

    success(props: Omit<NotificationProps, 'type'>) {
        this.open({ ...props, type: 'success' });
    }

    error(props: Omit<NotificationProps, 'type'>) {
        this.open({ ...props, type: 'error' });
    }

    warning(props: Omit<NotificationProps, 'type'>) {
        this.open({ ...props, type: 'warning' });
    }

    info(props: Omit<NotificationProps, 'type'>) {
        this.open({ ...props, type: 'info' });
    }
}

export default NotificationClient;
