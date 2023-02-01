"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
class AccessToken extends sequelize_1.Model {
}
AccessToken.init({
    name: { type: sequelize_1.DataTypes.STRING },
    token: { type: sequelize_1.DataTypes.STRING },
    recorded_date: { type: sequelize_1.DataTypes.DATE },
    expiration_time: { type: sequelize_1.DataTypes.INTEGER },
    limit_time: { type: sequelize_1.DataTypes.FLOAT }
}, {
    sequelize: config_1.sequelize,
    modelName: 'access_token',
    timestamps: false,
    freezeTableName: true
});
AccessToken.removeAttribute('id');
exports.default = AccessToken;
//# sourceMappingURL=access_token.js.map