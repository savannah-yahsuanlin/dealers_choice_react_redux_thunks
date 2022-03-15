import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store, { loadCompanies, loadStaffs }from './store'
import Companies from './Companies'
import Staffs from './Staffs'
import Nav from './Nav'
import Home from './Home'

class _App extends Component {

	componentDidMount() {
		this.props.bootstrap()

		window.addEventListener('hashchange', ()=> {
			this.props.setView(window.location.hash.slice(1));
		})
		this.props.setView(window.location.hash.slice(1));

	}

	render() {
		const { companies, staffs, view } = this.props
		return (
			<div>
				<h1>Acme Portal</h1>
				<small>Moe <a>Sign out</a></small>
					<Nav/>
					{view === 'home' &&  <Home/>}
				<div className='container'>
					{view === 'companies' && <Companies />}
					{view === 'staffs' && <Staffs />}
				</div>
			</div>
		)
	}
}

const App = connect (
  state => state,
  (dispatch)=> {
    return {
      setView: (view) => dispatch({ type: 'SET_VIEW', view }),
	  bootstrap: () =>{
		dispatch(loadCompanies())
		dispatch(loadStaffs())
	  }
    }
  }
)(_App);


render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
