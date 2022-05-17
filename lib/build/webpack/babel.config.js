"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    loader: 'babel-loader?cacheDirectory=true',
    options: {
        configFile: false,
        babelrc: false,
        presets: [
            require.resolve('@babel/preset-env'),
            [
                require.resolve("@babel/preset-react"),
                {
                    "runtime": "automatic"
                }
            ],
            [
                require.resolve("@babel/preset-typescript"),
                {
                    "isTSX": true,
                    "allExtensions": true
                }
            ],
        ],
    },
};
