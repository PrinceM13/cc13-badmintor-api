module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        brand: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { is: /^[0-9]{10}$/ }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        lineId: {   // optional
            type: DataTypes.STRING,
            unique: true,
            validate: { notEmpty: true }
        },
        image: {    // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        },
        note: {     // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    Supplier.associate = db => {
        Supplier.hasMany(db.Product, {
            foreignKey: {
                name: 'supplierId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return Supplier;
}