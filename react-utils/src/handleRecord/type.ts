export type FormatTime = 'timestamp' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD';

export type Opt = {
    clean?: boolean;
    arrToStr?: true;
    arrToStrOnly?: string[];
    formatTime?: FormatTime;
    formatTimeOnly?: Record<string, FormatTime>;
};
