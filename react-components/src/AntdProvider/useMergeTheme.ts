import type { ThemeConfig } from 'antd';

const useMergeTheme = (theme1: ThemeConfig, theme2: ThemeConfig) => {
    const theme: ThemeConfig = {
        ...theme1,
        ...theme2,
        token: {
            ...theme1.token,
            ...theme2.token,
        },
        components: {
            ...theme1.components,
            ...theme2.components,
        },
    };

    return theme;
};

export default useMergeTheme;
