import App from '../components/App';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { resetForm } from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onPageChange: () => dispatch(resetForm())
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
