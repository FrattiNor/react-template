import type { PropsWithChildren } from 'react';
import { PureComponent } from 'react';

class ErrorCatch extends PureComponent<PropsWithChildren, { hasError: boolean }> {
    constructor(props: never) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>对不起，发生异常，请刷新页面重试</h1>;
        } else {
            return this.props.children;
        }
    }
}

export default ErrorCatch;
