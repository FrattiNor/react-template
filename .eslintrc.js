module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/eslint')],
    rules: {
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/dot-notation': 'off',
    },
};
