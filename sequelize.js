const Sequelize = require('sequelize')
const statusModel = require('./models/status')

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

sequelize_db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
    })

module.exports = {
    status_table
}