import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Presentation Component to Display the headers.
 * @param title {string} - title of the header
 * @return {*}
 * @constructor
 */
const Header = ({title}) => {
  return (
      <h1 className="title has-text-white is-1">{title}</h1>
  )
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;