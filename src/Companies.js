import React from "react"
import { connect } from 'react-redux'
import { createCompany, deleteCompany } from "./store"


const Companies = ({ companies, create, foo }) => {

	return (
		<div className="company">
			
			<button onClick={create}>Add</button>
			<ul>
				<h3>Companies</h3>	
				{
					companies.map(company => {
						return (
							<div>
								<li key={company.id}>{company.id}. {company.name}</li>
								<button onClick={ () => foo(company)}>X</button>
							</div>
						)
					})
				}
			</ul>
		</div>
	)
}


const mapDispatchToProps = (dispatch) => {
	return {
		create: (name) => {
			dispatch(createCompany(name))
		},
		foo: (company) => {
			dispatch(deleteCompany(company))
		}
	}
}

export default connect(state => state, mapDispatchToProps)(Companies)