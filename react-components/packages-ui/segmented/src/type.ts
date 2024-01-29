export type SegmentedProps = {
    value?: string;
    bordered?: boolean;
    onChange?: (v: string) => void;
    options?: Array<{ label: string; value: string }>;
};
