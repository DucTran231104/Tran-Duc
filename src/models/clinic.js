'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    //     id
    // address
    // description
    // image
    clinic.init({
        address: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'clinic',
    });
    return clinic;
};