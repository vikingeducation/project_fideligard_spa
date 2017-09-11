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

    const backFill = (stocksOnDate, date) =>{
      //if there's data, continue to next
      if (stocksOnDate.length === 13) {
        return stocksOnDate;
      }
      // If there's no data at all for that date, go back in time til you find some
      if (stocksOnDate.length<1) {
        //get previous date
        //Hard-coding the assumption that we don't go back to previous month
        let prevDate;
        let prevDayNum = Number(date.slice(8)) - 1
        if (prevDayNum<10) {
          prevDate = date.slice(0, 8) + '0' + prevDayNum.toString();
        }
        if (prevDayNum>=10) {
          prevDate = date.slice(0, 8) + prevDayNum.toString();
        }
        let stocksOnPrevDate = 
        getStocksByDate(prevDate)

        return stocksOnPrevDate
      }
    }

    const getStocksByDate = (date)=>{
      let stocksByDate = stockArray.filter(arr=>{
        return arr[1] == date 
      })
      stocksByDate = backFill(stocksByDate, date);
      return stocksByDate
    }

    let newArray = getStocksByDate( selectedDate);

    console.log("newArray ", newArray)
    this.setState({
      filteredStocks: newArray
    })
  }



  render() {

    console.log("this.state", this.state)

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
