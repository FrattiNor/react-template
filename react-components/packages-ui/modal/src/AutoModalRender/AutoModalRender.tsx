import { useAutoModal } from '../AutoModalProvider';
import { FC, Fragment, Suspense } from 'react';
import Provider from './Provider';

const AutoModalRender: FC = () => {
    const { modalDisplay, modalData, parseKeyId, modals = {} } = useAutoModal();

    return (
        <Fragment>
            {Object.entries(modalDisplay).map(([keyId, visible]) => {
                const { key, id } = parseKeyId(keyId);
                if (visible && modals[key]) {
                    const Component = modals[key];
                    const data = modalData[id] ?? {};
                    return (
                        <Suspense key={id}>
                            <Provider keyId={keyId}>
                                <Component {...data} />
                            </Provider>
                        </Suspense>
                    );
                }
            })}
        </Fragment>
    );
};

export default AutoModalRender;
