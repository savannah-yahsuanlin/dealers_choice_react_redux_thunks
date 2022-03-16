import React from "react"
import { connect } from 'react-redux'
import { createStaff, deleteStaff } from './store'


const Staffs = ({ staffs, create, bar }) => {
	return (
	<div>
		<h4>More amazing staffs are coming</h4>
		<div>
			<button onClick={ create }>Add</button>
			<ul>
				<h3>Staffs</h3>	
				{
					staffs.map(staff => {
						return (
							<div>
								<li key={staff.id}>{staff.name}</li>
								<button onClick={ () => bar(staff)}>X</button>
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
			dispatch(createStaff(name))
		},
		bar: (staff) => {
			dispatch(deleteStaff(staff))
		}
	}
}

export default connect(state => state, mapDispatchToProps)(Staffs)