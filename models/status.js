module.exports = (sequelize, type) => {
    return sequelize.define('app_status', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        r_arus: type.INTEGER,
        r_tegangan: type.INTEGER,
        s_arus: type.INTEGER,
        s_tegangan: type.INTEGER,
        t_arus: type.INTEGER,
        t_tegangan: type.INTEGER,
        status_r: type.BOOLEAN,
        status_s: type.BOOLEAN,
        status_t: type.BOOLEAN,
        notes: type.STRING(100)
    })
}