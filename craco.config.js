module.exports = {
    // ...
    webpack: {
        // alias: { /* ... */ },
        rules: [
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ],
        // plugins: {
        //     add: [ /* ... */ ],
        //     remove: [ /* ... */ ],
        // },
        // configure: { /* ... */},
        // configure: (webpackConfig, { env, paths }) => {
        //     /* ... */
        //     return webpackConfig;
        // },
    },
};