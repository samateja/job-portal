import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

/**
 * Sumbits the TriggerSearch
 * @param job {Object}
 * @param onChange {Function}
 * @param onSearch {Function}
 * @param loading {boolean}
 * @param errors {Object}
 * @return {*}
 * @constructor
 */
const JobForm = ({job, onChange, onSearch, loading, errors}) => {
  return (
    <form >
     <div className="custom-box">
      <div className="column">
        <TextInput placeholder={"Location"} name={"location"} className={"input"} value={job.location} onChange={onChange} error={errors.title}/>
      </div>
      <div className="column">
        <TextInput placeholder={"Find your dream job now"} className={"input"} name={"query"} value={job.query} onChange={onChange} error={errors.title}/>
      </div>
      <div className="col">
        <input type="submit" disabled={loading} className="button is-primary" onClick={onSearch} value={loading? 'Searching...': 'Search'}/>
      </div>
     </div>
    </form>
  )
};

export default JobForm;

JobForm.propTypes = {
  job: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};
