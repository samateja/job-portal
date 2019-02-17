import React from 'react';
import PropTypes from 'prop-types';

/**
 * A robust input text component with error handling
 * @param name
 * @param className
 * @param placeholder
 * @param value
 * @param onChange
 * @param error
 * @return {*}
 * @constructor
 */
const TextInput = ({name, className, placeholder, value, onChange, error}) => {
  return (
    <div className="input-box">
      <input className={className} type="text" placeholder={placeholder} value={value} name={name} onChange={onChange.bind(this)}/>
      {error && <div className="is-danger">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default TextInput;