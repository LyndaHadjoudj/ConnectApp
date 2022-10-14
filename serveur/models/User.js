module.exports = (sequelize, DataType) => {
    const Users = sequelize.define('Users', {
        username: {
            type: DataType.STRING,
            allownull: false
        },
        password: {
            type: DataType.STRING,
            allownull: false
        }
    });
    // Users.associate = (models) => {
    //     Users.hasMany(models.Posts, {
    //         OnDelete: "cascade",
    //     });

    // }

    return Users;
}