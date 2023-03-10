module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: { notEmpty: true }
        },
        note: {     // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    Product.associate = db => {
        Product.belongsTo(db.Supplier, {
            foreignKey: {
                name: 'supplierId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Product.belongsTo(db.Category, {
            foreignKey: {
                name: 'categoryId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Product.hasOne(db.Promotion, {
            foreignKey: {
                name: 'productId',
                unique: true,
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Product.hasMany(db.Cart, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Product.hasMany(db.OrderItem, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return Product;
}