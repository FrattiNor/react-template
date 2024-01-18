import useContainer from './useContainer';
import ReactDOM from 'react-dom/client';
import { useRef } from 'react';

type Props = {
    getContainer?: () => HTMLElement | undefined;
};

const useReactDomRoot = (props: Props) => {
    const renderDomRef = useRef<HTMLDivElement | null>(null);
    const reactDomRootRef = useRef<ReactDOM.Root | null>(null);
    const { getContainer, clearContainer } = useContainer({ getContainer: props.getContainer });

    const getRenderDom = () => {
        if (renderDomRef.current === null) renderDomRef.current = document.createElement('div');
        return renderDomRef.current;
    };

    const clearRenderDom = () => {
        renderDomRef.current = null;
    };

    const clearReactDomRoot = () => {
        reactDomRootRef.current = null;
    };

    const mountReactDomRoot = () => {
        const container = getContainer();
        const renderDom = getRenderDom();

        if (reactDomRootRef.current !== null) {
            return {
                container,
                reactDomRoot: reactDomRootRef.current,
            };
        }

        try {
            container.removeChild(renderDom);
        } catch (e) {
            //
        }

        container.appendChild(renderDom);
        reactDomRootRef.current = ReactDOM.createRoot(renderDom);

        return {
            container,
            reactDomRoot: reactDomRootRef.current,
        };
    };

    const unmountReactDomRoot = () => {
        try {
            if (reactDomRootRef.current) {
                reactDomRootRef.current.unmount();
                const container = getContainer();
                const renderDom = getRenderDom();
                container.removeChild(renderDom);
                clearReactDomRoot();
                clearRenderDom();
                clearContainer();
            }
        } catch (e) {
            //
        }
    };

    return { mountReactDomRoot, unmountReactDomRoot };
};

export default useReactDomRoot;
