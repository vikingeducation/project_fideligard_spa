
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/stockActions';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router';
import MainBody from '../components/MainBody.js'


const mapStateToProps = state => state;

const MainBodyContainer = withRouter(connect(mapStateToProps, null)(MainBody));

export default MainBodyContainer