export const getComponent = (component?: any) => {
    if (component && component.default) {
        return component.default;
    }
    if (component) {
        return component;
    }
    return null;
};
