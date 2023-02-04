const { ADMIN, SUPER_USER } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        role: {
            type: DataTypes.ENUM(ADMIN, SUPER_USER),
            allowNull: false,
            defaultValue: ADMIN
        }
    }, { underscored: true });

    Employee.associate = db => {
        Employee.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                unique: true,
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Employee.hasMany(db.ShipmentStatus, {
            foreignKey: {
                name: 'employeeId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Employee.hasMany(db.RewardTransaction, {    // optional
            foreignKey: {
                name: 'employeeId'
            },
            onDelete: 'RESTRICT'
        });
    }

    return Employee;
}