import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";
import {getDateParsed} from "../utils";

/**
 * Lists All the Jobs in Job Cards on Search.
 * @param jobs - {Array<Object>}
 * @param fetchJob - {Function}
 * @return {*}
 * @constructor
 */
const JobList = ({jobs, fetchJob}) => {
  const fetchJobs = () => {
    return jobs.slice(0, 10).map(eachJob => {
      return <Card onClick={fetchJob} applied={eachJob.applied} key={eachJob.id} jobId={eachJob.id} location={eachJob.location} jobTitle={eachJob.title} company={eachJob.company} description={eachJob.description} mode={eachJob.type} date={getDateParsed(eachJob.created_at)}/>
    })
  };
  return (
    <div>
      {fetchJobs()}
    </div>
  )
};

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  fetchJob: PropTypes.func.isRequired
};

export default JobList;