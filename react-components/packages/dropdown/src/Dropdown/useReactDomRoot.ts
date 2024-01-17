import { DropdownProps } from '../type';
import ReactDOM from 'react-dom/client';
import { useRef } from 'react';

const useReactDomRoot = ({ getContainer }: DropdownProps) => {
    const renderDom = useRef(document.createElement('div'));
    const reactDomRoot = useRef<ReactDOM.Root | null>(null);

    const _getContainer = () => {
        const container = getContainer ? getContainer() ?? document.body : document.body;
        return container;
    };

    const mountReactDomRoot = () => {
        if (reactDomRoot.current !== null) {
            return reactDomRoot.current;
        }

        const container = _getContainer();

        try {
            container.removeChild(renderDom.current);
        } catch (e) {
            //
        }

        container.appendChild(renderDom.current);

        reactDomRoot.current = ReactDOM.createRoot(renderDom.current);

        return reactDomRoot.current;
    };

    const unmountReactDomRoot = () => {
        if (reactDomRoot.current) {
            reactDomRoot.current.unmount();
            reactDomRoot.current = null;

            const container = _getContainer();

            try {
                container.removeChild(renderDom.current);
            } catch (e) {
                //
            }
        }
    };

    return { mountReactDomRoot, unmountReactDomRoot, getContainer: _getContainer };
};

export default useReactDomRoot;
