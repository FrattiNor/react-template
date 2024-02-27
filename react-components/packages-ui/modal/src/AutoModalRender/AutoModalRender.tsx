import { FC, Fragment, Suspense } from 'react';

import Provider from './Provider';
import { useAutoModal } from '../AutoModalProvider';

const AutoModalRender: FC = () => {
    const { modalVisible, modalData, parseKeyId, modals = {} } = useAutoModal();

    return (
        <Fragment>
            {Object.entries(modalVisible).map(([keyId]) => {
                const { key, id } = parseKeyId(keyId);
                if (modals[key]) {
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
