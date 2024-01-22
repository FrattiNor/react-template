import { useAutoModal } from '../AutoModalProvider';
import { FC, Suspense } from 'react';
import Provider from './Provider';

const AutoModalRender: FC = () => {
    const { modalDisplay, modalData, modals, parseKeyId } = useAutoModal();

    return (
        <Suspense>
            {Object.entries(modalDisplay).map(([keyId, visible]) => {
                const { key, id } = parseKeyId(keyId);
                if (visible && modals[key]) {
                    const Component = modals[key];
                    const data = modalData[id] ?? {};
                    return (
                        <Provider key={id} keyId={keyId}>
                            <Component {...data} />
                        </Provider>
                    );
                }
            })}
        </Suspense>
    );
};

export default AutoModalRender;
