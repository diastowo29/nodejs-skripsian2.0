module.exports = (sequelize, type) => {
    return sequelize.define('arus_tegangan', {
        id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        r_arus: type.FLOAT,
        r_tegangan: type.FLOAT,
        s_arus: type.FLOAT,
        s_tegangan: type.FLOAT,
        t_arus: type.FLOAT,
        t_tegangan: type.FLOAT
    })
}