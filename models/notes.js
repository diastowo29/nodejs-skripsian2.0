module.exports = (sequelize, type) => {
    return sequelize.define('notes', {
        id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        notes: type.STRING(100)
    })
}