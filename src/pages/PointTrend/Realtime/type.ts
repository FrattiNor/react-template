import useRealtimeData from './useRealtimeData';

export type Params = {
    fullPointTags?: string[];
};

export type Props = {
    realtimeData: ReturnType<typeof useRealtimeData>;
};
