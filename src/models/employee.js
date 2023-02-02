const { ADMIN, SUPER_USER } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        role: {
            type: DataTypes.ENUM(ADMIN, SUPER_USER),
            allowNull: false,
            defaultValue: ADMIN
        }
    }, { underscored: true });

    return Employee;
}