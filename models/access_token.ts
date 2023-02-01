import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config';

class AccessToken extends Model {}

AccessToken.init({
    name: { type: DataTypes.STRING },
    token: { type: DataTypes.STRING },
    recorded_date: { type: DataTypes.DATE },
    expiration_time: { type: DataTypes.INTEGER },
    limit_time: { type: DataTypes.FLOAT }
}, {
    sequelize,
    modelName: 'access_token',
    timestamps: false,
    freezeTableName: true
});

AccessToken.removeAttribute('id');

export default AccessToken;
