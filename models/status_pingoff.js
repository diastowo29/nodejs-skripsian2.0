module.exports = (sequelize, type) => {
    return sequelize.define('status_pingoff', {
        id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        status_r: type.BOOLEAN,
        status_s: type.BOOLEAN,
        status_t: type.BOOLEAN
    })
}