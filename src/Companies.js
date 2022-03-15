import React from "react"
import { connect } from 'react-redux'
import { createCompany, deleteCompany, updatedCompany } from "./store"


const Companies = ({ companies, create, foo, toggle }) => {

	return (
	<div>
		<h4>2022 Target <span>100</span> companies join Acme Bootcamp.
			<span> Need {100 - companies.length}</span>
		</h4>
		<p className="subscribed">Confirmed the company will join 2022 presentation event</p>
		<div>
			<button onClick={create}>Add</button>
			<ul>
				<h3>Companies</h3>	
				{
					companies.map(company => {
						return (
							<div>
								<li onClick={() => toggle(company)} className={ company.subscribed ? 'subscribed': ''} key={company.id}>{company.id}. {company.name}</li>
								<button onClick={ () => foo(company)}>X</button>
							</div>
						)
					})
				}
			</ul>
		</div>
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
		},
		toggle: (company) => {
			dispatch(updatedCompany(company))
		}
	}
}

export default connect(state => state, mapDispatchToProps)(Companies)