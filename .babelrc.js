module.exports = (api) => {
    // Cache the returned value forever and don't call this function again.
    api.cache(true);
    return {
        presets: ['@babel/preset-env'],
        plugins: [
            ['@babel/plugin-transform-runtime', {
                'corejs': 2,
            }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-destructuring',
            '@babel/plugin-proposal-async-generator-functions',
        ],
    };
};
