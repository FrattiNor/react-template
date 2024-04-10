export type Theme = 'light' | 'dark';

export type ThemeProps = {
    theme?: Theme;
    container:
        | {
              withBg?: boolean;
              className?: string;
              minWidth?: number | string;
              minHeight?: number | string;
          }
        | true;
};
