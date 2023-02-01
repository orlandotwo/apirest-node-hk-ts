"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.dbConnection = void 0;
const sequelize_1 = require("sequelize");
const db_model_1 = require("./db-model");
const sequelize = new sequelize_1.Sequelize(db_model_1.db_model.database, db_model_1.db_model.username, db_model_1.db_model.password, {
    host: db_model_1.db_model.host,
    dialect: db_model_1.db_model.dialect,
    define: { freezeTableName: true }
});
exports.sequelize = sequelize;
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Data Base -> houlakdb - online');
    }
    catch (error) {
        console.log(error);
        console.error('Error al iniciar la base de datos');
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map