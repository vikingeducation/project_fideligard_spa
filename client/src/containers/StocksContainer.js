import React, {Component} from 'react';
import { connect } from 'react-redux';
import Stocks from '../components/Stocks';
import { getStocks } from '../actions/stocksAction';

class StocksContainer extends Component{
    
    componentDidMount() {
        this.props.getStocks();
    }
    
    render(){
        
        return (
            <Stocks />    
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStocks: () => {
            dispatch(getStocks())
        }
    }
}




export default connect(null, mapDispatchToProps)(StocksContainer);