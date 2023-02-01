import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config';

class Requests extends Model {}

Requests.init({
    ip: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    artist_name: { type: DataTypes.STRING }
}, {
    sequelize,
    modelName: 'requests',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

export default Requests;
