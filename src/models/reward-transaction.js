module.exports = (sequelize, DataTypes) => {
    const RewardTransaction = sequelize.define('RewardTransaction', {
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: { notEmpty: true }
        },
        note: {     // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    RewardTransaction.associate = db => {
        RewardTransaction.belongsTo(db.Employee, {
            foreignKey: {
                name: 'employeeId'
            },
            onDelete: 'RESTRICT'
        });

        RewardTransaction.belongsTo(db.Reward, {
            foreignKey: {
                name: 'rewardId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        RewardTransaction.belongsTo(db.Order, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        RewardTransaction.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return RewardTransaction;
}