const {Sequelize, STRING, BOOLEAN} = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_redux')
const faker = require('faker')

// models
const Company = db.define('company', {
	name: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	subscribed: {
		type: BOOLEAN,
		defaultValue: false
	}
})

const Staff = db.define('staff', {
	name: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
})

//create random 
Company.createCompany = function() {
	return Company.create({name: faker.company.companyName()})
} 

Staff.createStaff = function() {
	return Staff.create({name: faker.name.firstName()})
}


//seeds
const syncAndSeed = async() => {
	await db.sync({force: true})

	await Promise.all([
		Company.create({name: 'Pfizer', subscribed: true}),
		Company.create({name: 'Johnson and Johnson', subscribed: true}),
		Company.create({name: 'Novartis'}),

		Staff.create({name: 'Prof'}),
		Staff.create({name: 'Jonathan'}),
		Staff.create({name: 'Stanley'}),
		Staff.create({name: 'Shaun'}),
		Staff.create({name: 'Moe'})
	])
}

//export modules
module.exports = {
	syncAndSeed,
	models: {
		Company,
		Staff
	}
}