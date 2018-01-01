import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Input } from 'reactstrap';
import { redirectFromSelect } from '../helpers/nav';

const NavSelect = ({ location, history }) => {
  // extract link name from current location
  const linkName = location.pathname.split('/').filter(i => i !== '')[0];

  return (
    <nav className="NavSelect col-md-4 pull-right">
      <Input
        type="select"
        name="nav"
        onChange={(e) => redirectFromSelect(history, e)}
        value={linkName}
      >
        <option value="portfolio">Portfolio</option>
        <option value="trade">Trade</option>
        <option value="transactions">Transactions</option>
      </Input>
    </nav>
  );
};

NavSelect.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(NavSelect);
