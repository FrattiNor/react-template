import { CSSProperties, PropsWithChildren } from 'react';

export type ContextProps = {
    width: Record<string, number | string>;
    style: Record<string, CSSProperties>;
    className: Record<string, string>;
};

export type Props = PropsWithChildren<Partial<ContextProps>>;

export type LineProps = PropsWithChildren;
