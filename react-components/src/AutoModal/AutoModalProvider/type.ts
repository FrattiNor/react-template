import { type ComponentClass, type ComponentType, type FC, type LazyExoticComponent } from 'react';

export type AutoModals = {
	readonly [key: string]: LazyExoticComponent<FC<any> | ComponentClass<any>>;
};

export type ModalData<T> = T extends LazyExoticComponent<ComponentType<infer R>> ? R : never;
