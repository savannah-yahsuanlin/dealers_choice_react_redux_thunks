import React from "react"
import { connect } from 'react-redux'



const Home = () => {
	return (
		<div className="home">
			<div>
				Welcome back Moe.
				<p>Make impact everyday!</p>
			</div>
		</div>
	)
}



export default connect(state => state)(Home)