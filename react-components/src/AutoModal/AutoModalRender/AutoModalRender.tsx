import type { FC } from 'react';
import { Fragment, Suspense } from 'react';

import Provider from './Provider';
import { useAutoModal } from '../AutoModalProvider';
import type { AutoModals } from '../AutoModalProvider/type';

type Props = {
    modals: AutoModals;
};

const AutoModalRender: FC<Props> = ({ modals }) => {
    const { modalVisible, modalData, parseKeyId } = useAutoModal();

    return (
        <Fragment>
            {Object.entries(modalVisible).map(([keyId]) => {
                const { key } = parseKeyId(keyId);
                if (modals[key]) {
                    const Component = modals[key];
                    const data = modalData[keyId] ?? {};
                    return (
                        <Suspense key={keyId}>
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
