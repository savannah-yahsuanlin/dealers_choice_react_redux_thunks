import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store, { loadCompanies, loadStaffs }from './store'
import Companies from './Companies'
import Staffs from './Staffs'


class _App extends Component {

	componentDidMount() {
		this.props.bootstrap()

		window.addEventListener('hashchange', ()=> {
			this.props.setView(window.location.hash.slice(1));
		})
		this.props.setView(window.location.hash.slice(1));

	}

	render() {
		const {companies, staffs, view} = this.props
		return (
			<div>
				<h1>Acme Bootcamp</h1>
				<Companies />
				<Staffs />
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
