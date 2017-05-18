import React, { Component } from "react";
import { connect } from "react-redux";
import Stocks from "../components/Stocks";
import { fetchStocks } from "../actions/stocksAction";

class StocksContainer extends Component {
    componentDidMount() {
        this.props.fetchStocks(this.props.date);
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.date !== this.props.date) {
            this.props.fetchStocks(newProps.date);
        }
    }

    render() {
        return <Stocks stocks={this.props.stocks} date={this.props.date}/>;
    }
}
function mapStateToProps(state) {
    return {
        stocks: state.stocks.data,
        date: state.date
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStocks: date => {
            dispatch(fetchStocks(date));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
