import React from "react"
import { connect } from 'react-redux'


const Nav = ({ companies, staffs }) => {
	return (
		<nav>
			<a href="#home">Home</a>
			<a href="#companies">Company</a>
			<a href="#staffs">Staffs</a>
		</nav>
	)
}

export default connect(state => state)(Nav)