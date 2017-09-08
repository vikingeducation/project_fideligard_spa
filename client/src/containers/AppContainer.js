import React, {Component} from 'react'
import {connect} from 'react-redux'
import App from '../App.js'

class AppContainer extends Component {
  constructor() {
    super()
  }

  componentDidMount()

  render() {
    return (
      <App />
    )
  }
}


mapStateToProps = (state) => {},

mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
