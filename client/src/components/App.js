import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import DatePickerContainer from '../containers/DatePickerContainer'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container-fluid">
      <h1>Fideligard</h1>
      <div className="row">
      <div className="col-md-4">
        { /* stocks */}
      </div>
      <div className="col">
      <DatePickerContainer />
      </div>
      </div>
      </div>
     </Router>
    );
  }
}

export default App;
