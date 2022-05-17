"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.existsFile = exports.loadFile = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var os_1 = __importDefault(require("os"));
var index_1 = require("./index");
var loadFile = function (path, system) {
    if (system === void 0) { system = true; }
    var rePath = system ? os_1.default.homedir() + "/" + path : path;
    try {
        if (!fs_extra_1.default.pathExistsSync(rePath)) {
            return false;
        }
        var data = fs_extra_1.default.readJsonSync(rePath);
        return data;
    }
    catch (err) {
        index_1.loggerError("Error reading file from disk: " + rePath);
    }
};
exports.loadFile = loadFile;
var existsFile = function (path, system) {
    if (system === void 0) { system = true; }
    var rePath = system ? os_1.default.homedir() + "/" + path : path;
    index_1.loggerInfo(rePath);
    return fs_extra_1.default.pathExistsSync(rePath);
};
exports.existsFile = existsFile;
/**
 * @description: 写入文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
var writeFile = function (path, fileName, file, system) {
    if (system === void 0) { system = true; }
    var rePath = system ? os_1.default.homedir() + "/" + path : path;
    index_1.loggerInfo(rePath);
    try {
        fs_extra_1.default.outputJsonSync(rePath + "/" + fileName, file);
        index_1.loggerSuccess('Writing file successful!');
    }
    catch (err) {
        index_1.loggerError("Error writing file from disk: " + err);
    }
};
exports.writeFile = writeFile;
