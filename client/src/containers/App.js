import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from '../actions/stockActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from '../components/Header';
// import _ from 'lodash'

class App extends Component {
  constructor() {
    super();
    this.state = {
      filteredStocks: [],
      selectedDate: null,
    }
  }

  componentDidMount() {
    if (!this.props.stockReducer.stocks.length) {
      this.props.actions.getStocks();
    }
  }


  onDateChange = (e)=>{
    
    let stockArray = this.props.stockReducer.stocks;
    let selectedDate = e.target.value
    this.setState({
      selectedDate: selectedDate
    })
    let newArray = stockArray.filter(arr=>{

      return arr[1] == selectedDate 

    })
    newArray.map(arrMissingDate=>{
      if (!arrMissingDate.length) {
        arrMissingDate = stockArray.filter(arrPrevDate=>{
          return arrPrevDate[0]===arrMissingDate[0] && arrPrevDate[2] === (arrMissingDate[2] - 1)
        })
      }
    })

    console.log("App.js line 25 ", newArray)
    this.setState({
      filteredStocks: newArray
    })
  }



  render() {

    console.log("App.js line 44 ", this.state)

    return (
      <div className="app">
        <Header />
        <Dashboard onDateChange={this.onDateChange} stocks={this.state.filteredStocks}/>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(stockActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
