module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
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

    Category.associate = db => {
        Category.hasMany(db.Product, {
            foreignKey: {
                name: 'categoryId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return Category;
}