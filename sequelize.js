const Sequelize = require('sequelize')
const statusModel = require('./models/status')
const statusV2Model = require('./models/status-v2')
const arusTeganganModel = require('./models/arus_tegangan')
const notesModel = require('./models/notes')
const statusGarduModel = require('./models/status_gardu')
const statusPingModel = require('./models/status_pingoff')

var sequelize_db;

if (process.env.DATABASE_URL === undefined) {
	sequelize_db = new Sequelize('postgres', 'postgres', 'R@hasia', {
	  host: 'localhost',
	  dialect: 'postgres'
	});
} else {
	sequelize_db = new Sequelize(process.env.DATABASE_URL, {
		logging: false,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
		    },
		    keepAlive: true,
		},      
		ssl: true
	})
}


const status_table = statusModel(sequelize_db, Sequelize)
const statusV2_table = statusV2Model(sequelize_db, Sequelize)
const arusTeganganTable = arusTeganganModel(sequelize_db, Sequelize)
const notesTable = notesModel(sequelize_db, Sequelize)
const statusGarduTable = statusGarduModel(sequelize_db, Sequelize)
const statusPingTable = statusPingModel(sequelize_db, Sequelize)

sequelize_db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
    })

module.exports = {
	status_table,
	statusV2_table,
	arusTeganganTable,
	notesTable,
	statusGarduTable,
	statusPingTable
}