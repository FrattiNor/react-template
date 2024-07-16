import type { CSSProperties } from 'react';

export type SegmentedProps<T extends string> = {
    value?: T;
    bordered?: boolean;
    onChange?: (v: T) => void;
    options?: Array<{ label: string; value: string }>;

    className?: string;
    style?: CSSProperties;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
};
