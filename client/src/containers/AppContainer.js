import App from '../components/App';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset } from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onPageChange: () => dispatch(reset())
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
