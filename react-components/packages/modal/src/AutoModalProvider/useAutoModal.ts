import { LazyExoticComponent, ComponentType } from 'react';
import useAutoModalProvider from './useAutoModalProvider';
import { AutoModals } from '../type';

type ModalData<T> = T extends LazyExoticComponent<ComponentType<infer R>> ? R : never;

const useAutoModal = <M extends AutoModals>() => {
    const { openModal } = useAutoModalProvider<M>();

    const _openModal = <K extends keyof M>(key: K, data: ModalData<M[K]>) => {
        openModal(key, data);
    };

    return { openModal: _openModal };
};

export default useAutoModal;
