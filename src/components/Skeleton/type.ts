import { CSSProperties, PropsWithChildren } from 'react';

export type ContentItem = 'title' | 'paragraph';

export type Props = PropsWithChildren<{
    loading?: boolean;
    padding?: ('top' | 'left' | 'right' | 'bottom')[];
    className?: string;
    style?: CSSProperties;
    content?: ContentItem[];
    count?: number;
}>;
