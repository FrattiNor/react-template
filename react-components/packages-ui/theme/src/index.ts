import { default as ThemeHoc } from './Hoc';
import { default as ThemeProvider } from './Provider';
import useTheme from './useTheme';

export { default as AntdThemeProvider } from './AntdThemeProvider';
export { default as lightStyles } from './theme-light.module.less';
export { default as darkStyles } from './theme-dark.module.less';
export { default as themeStyles } from './theme.module.less';
export { useTheme, ThemeProvider, ThemeHoc };
export type { Theme } from './type';
