"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = void 0;
const getCurrentDate = () => {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toTimeString();
    const currentNumberDate = Date.now() / 1000;
    const resp = {
        date,
        currentDate,
        currentTime,
        currentNumberDate
    };
    return resp;
};
exports.getCurrentDate = getCurrentDate;
//# sourceMappingURL=tools.js.map