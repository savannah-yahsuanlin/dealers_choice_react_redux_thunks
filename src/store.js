import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios';


//action 
const LOAD_COMPANIES = 'LOAD_COMPANIES'
const CREATE_COMPANIES = 'CREATE_COMPANIES'
const DELETE_COMPANY = 'DELETE_COMPANY'

const LOAD_STAFFS = 'LOAD_STAFFS'
const CREATE_STAFFS = 'CREATE_STAFFS'
const DELETE_STAFF = 'DELETE_STAFF'

const SET_VIEW = 'SET_VIEW'

const companiesReducer = (state = [], action) => {
	if(action.type === LOAD_COMPANIES) {
		state = action.companies
	}
	if(action.type === CREATE_COMPANIES) {
		state = [...state, action.company]
	}
	if(action.type === DELETE_COMPANY) {
		state = state.filter(company => company.id !== action.company.id)
	}

	return state
}

const staffsReducer = (state = [], action) => {
	if(action.type === LOAD_STAFFS) {
		state = action.staffs
	}
	if(action.type === CREATE_STAFFS) {
		state = [...state, action.staff]
	}
	if(action.type === DELETE_STAFF) {
		state = state.filter(staff => staff.id !== action.staff.id)
	}
	return state
}

const viewReducer = (state = '', action) => {
	if(action.type === SET_VIEW){
		state = action.view
	}
	return state
}


//combine
const reducer = combineReducers({
	companies: companiesReducer,
	staffs: staffsReducer,
	view: viewReducer
})

//company data
const loadCompanies = () => {
	return async(dispatch) => {
		const companies = (await axios.get('/api/companies')).data
		dispatch({type: LOAD_COMPANIES, companies}, companies)
	}
}

const createCompany = () => {
	return async(dispatch) => {
		const company = (await axios.post('/api/companies/random')).data
		dispatch({type: CREATE_COMPANIES, company}, company)
	}
}

const deleteCompany = (company) => {
	return async(dispatch) => {
		await axios.delete(`/api/companies/${company.id}`)
		dispatch({ type: DELETE_COMPANY, company})
	}
}

//staff data
const loadStaffs = () => {
	return async(dispatch) => {
		const staffs = (await axios.get('/api/staffs')).data
		dispatch({type: LOAD_STAFFS, staffs}, staffs)
	}
}

const createStaff = () => {
	return async(dispatch) => {
		const staff = (await axios.post('/api/staffs/random')).data
		dispatch({type: CREATE_STAFFS, staff}, staff)
	}
}

const deleteStaff = (staff) => {
	return async(dispatch) => {
		await axios.delete(`/api/staffs/${staff.id}`)
		dispatch({type: DELETE_STAFF, staff})
	}
}


//view
const setView = (view) => {
	return {
		type: SET_VIEW,
		view 
	}
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

export {loadCompanies, createCompany, deleteCompany, loadStaffs, createStaff, deleteStaff, setView} 

export default store

