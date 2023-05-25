import { PropsWithChildren } from 'react';

export type ContextProps = {
    widths?: (number | string)[];
    widthClassNames?: string[];
};

export type Props = PropsWithChildren<ContextProps>;

export type TrProps = PropsWithChildren;
