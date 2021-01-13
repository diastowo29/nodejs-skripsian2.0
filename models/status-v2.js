module.exports = (sequelize, type) => {
    return sequelize.define('app_status_v2', {
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
        t_tegangan: type.FLOAT,
        status_r: type.BOOLEAN,
        status_s: type.BOOLEAN,
        status_t: type.BOOLEAN,
        notes: type.STRING(100)
    })
}