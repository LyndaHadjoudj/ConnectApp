module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        comments: {
            type: DataTypes.STRING,
            allownull: false,
        },
        username: {
            type: DataTypes.STRING,
            allownull: false,
        }
    })
    return Comments
};