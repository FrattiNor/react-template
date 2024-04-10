const encode = (keyword: string) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /[\[\(\$\^\.\]\*\?\+\{\}\|\)]/gi;
    return keyword.replace(reg, (key) => `\\${key}`);
};

const regExpMatch = (searchText: string, matchText: string, flags: 'g' | 'ig' = 'ig') => {
    return searchText.match(new RegExp(encode(matchText), flags)) ?? [];
};

const regExpSplit = (searchText: string, matchText: string, flags: 'g' | 'ig' = 'ig') => {
    return searchText.split(new RegExp(encode(matchText), flags)) ?? [];
};

export { regExpMatch, regExpSplit };
