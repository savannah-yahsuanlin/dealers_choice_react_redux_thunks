const express = require('express');
const {syncAndSeed, models: {Company, Staff}} = require('./db')
const path = require('path');

const app = express();

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

//Company
app.get('/api/companies', async(req, res, next) => {
	try {
		res.send(await Company.findAll());
	} catch (error) {
		next(error)
	}
})

app.post('/api/companies/random', async(req, res, next) => {
	try {
		res.send(await Company.createCompany());
	} catch (error) {
		next(error)
	}
})

app.delete('/api/companies/:id', async(req, res, next) => {
	try {
		const company = await Company.findByPk(req.params.id)
		await company.destroy()
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

app.put('/api/companies/:id', async(req, res, next) => {
	try {
		const company = await Company.findByPk(req.params.id)
		await company.update(req.body)
		res.send(company)
	} catch (error) {
		next(error)
	}
})

//Staff
app.get('/api/staffs', async(req, res, next) => {
	try {
		res.send(await Staff.findAll());
	} catch (error) {
		next(error)
	}
})

app.post('/api/staffs/random', async(req, res, next) => {
	try {
		res.send(await Staff.createStaff());
	} catch (error) {
		next(error)
	}
})

app.delete('/api/staffs/:id', async(req, res, next) => {
	try {
		const staff = await Staff.findByPk(req.params.id)
		await staff.destroy()
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})


//connect everything
const setUp = async() => {
	try {
		await syncAndSeed()
		const port = process.env.PORT || 1339
		app.listen(port, ()=> {console.log(`Listening on port ${port}`)})
	} catch (error) {
		console.log(error)
	}
}

setUp()