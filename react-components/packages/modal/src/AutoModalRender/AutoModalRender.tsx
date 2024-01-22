import { useAutoModalProvider } from '../AutoModalProvider';
import { FC, Suspense, lazy } from 'react';
import Provider from './Provider';

const AutoModalRender: FC = () => {
    const { modalDisplay, modalData, modals, parseKeyId } = useAutoModalProvider();

    return (
        <Suspense>
            {Object.entries(modalDisplay).map(([keyId, visible]) => {
                const { key, id } = parseKeyId(keyId);
                if (visible && modals[key]) {
                    const Component = lazy(modals[key]);
                    const data = modalData[id] ?? {};
                    return (
                        <Provider key={id} modalKey={key} id={id}>
                            <Component {...data} />
                        </Provider>
                    );
                }
            })}
        </Suspense>
    );
};

export default AutoModalRender;
