const comments = require("./comments");

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        users: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commentaire: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });

    }
    return Posts
};