"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
class Requests extends sequelize_1.Model {
}
Requests.init({
    ip: { type: sequelize_1.DataTypes.STRING },
    date: { type: sequelize_1.DataTypes.DATE },
    artist_name: { type: sequelize_1.DataTypes.STRING }
}, {
    sequelize: config_1.sequelize,
    modelName: 'requests',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
exports.default = Requests;
//# sourceMappingURL=requests.js.map