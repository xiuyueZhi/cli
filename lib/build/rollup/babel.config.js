"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    configFile: false,
    babelrc: false,
    presets: [
        require.resolve('@babel/preset-env'),
        require.resolve("@babel/preset-react")
    ],
};
