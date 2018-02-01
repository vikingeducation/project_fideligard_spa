import React from 'react';
import PropTypes from 'prop-types';

const SortCaret = ({ direction, isSortedColumn }) => {
  if (!isSortedColumn || direction === 'NONE') return null;

  return <i className={`fa fa-caret-${ direction === 'ASC' ? 'up' : 'down' }`} aria-hidden="true"></i>;
};

SortCaret.propTypes = {
  direction: PropTypes.string.isRequired,
  isSortedColumn: PropTypes.bool.isRequired
};

export default SortCaret;
