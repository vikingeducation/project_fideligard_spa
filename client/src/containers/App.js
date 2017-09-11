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


  onDateChange = (e) => {
    
    let stockArray = this.props.stockReducer.stocks;
    let selectedDate = e.target.value
    
    this.setState({
      selectedDate: selectedDate
    })

    const getPrevDate = (dateStr, numberDaysPrevious) => {
      let prevDate;
      let prevDayNum = Number(dateStr.slice(8)) - numberDaysPrevious;
      let prevMonthNum = Number(dateStr.slice(5, 7)) - 1
      if (prevDayNum === 0) {
        if (prevMonthNum === 0) {
      //hardcoding to go back no further than 2016-01-01
          return '2016-01-01';
        }
        prevDate = '2016-' + prevMonthNum.toString() + '-31';
      }
      if (prevDayNum<0) {
        prevDate = '2016-' + prevMonthNum.toString() + '-' + (31 + prevDayNum).toString();
      }
      if (prevDayNum<10 && prevDayNum>0) {
          prevDate = dateStr.slice(0, 8) + '0' + prevDayNum.toString();
        }
      if (prevDayNum>=10) {
          prevDate = dateStr.slice(0, 8) + prevDayNum.toString();
        }
      return prevDate
    }

    const backFill = (stocksOnDate, date) =>{
      //if there's data, continue to next
      if (stocksOnDate.length === 13) {
        return stocksOnDate;
      }
      // If there's no data at all for that date, go back in time til you find some
      if (stocksOnDate.length<1) {
        //get previous date
        let stocksOnPrevDate = 
        getStocksByDate(getPrevDate(date, 1))

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

    const selectedDateArray = getStocksByDate(selectedDate);
    console.log(selectedDateArray)
    const oneDayAgoArray = getStocksByDate(getPrevDate(selectedDate, 1));
    const sevenDayAgoArray = getStocksByDate(getPrevDate(selectedDate, 7));
    const thirtyDayAgoArray = getStocksByDate(getPrevDate(selectedDate, 30));

    const newArray = selectedDateArray.map((arr, index) => {
      return arr.concat(oneDayAgoArray[index][2], sevenDayAgoArray[index][2], thirtyDayAgoArray[index][2])
     })

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
