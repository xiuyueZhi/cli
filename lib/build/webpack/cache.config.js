"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
exports.default = {
    cache: {
        type: 'filesystem',
        cacheDirectory: util_1.getCwdPath('./temp_cache'),
        // 缓存依赖，当缓存依赖修改时，缓存失效
        buildDependencies: {
            // 将你的配置添加依赖，更改配置时，使得缓存失效
            config: [__filename]
        },
        allowCollectingMemory: true,
        profile: true,
    },
};
