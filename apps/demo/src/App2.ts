// import { ComponentType } from 'react';

// const modals = {
//     modal1: () => import('./Modal1'),
//     modal2: () => import('./Modal2'),
// } as const;

// type Modals = typeof modals;

// type ModalReturnType<T> = T extends () => Promise<{ default: ComponentType<infer R> }> ? R : never;

// type Data1 = ModalReturnType<Modals['modal1']>;

// type Data2 = ModalReturnType<Modals['modal2']>;
