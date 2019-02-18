import React from 'react';
import PropTypes from 'prop-types';
import {getDateParsed} from "../utils";

/**
 * Component - To display the Job Details in Big Card - Mounted in /job/:jobId
 */
class JobDetails extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = Object.assign({}, this.props);
  }

  componentDidMount() {
    const desc = document.getElementById("desc");
    desc.innerHTML = this.state.job.description;

  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(Object.assign({}, nextProps));
  }

  render() {
    return (
      <div className="job-detail card big-card has-background-white">
        <div className="card-header columns is-multiline level">
          <div className="column is-full">
            <button className="button is-pulled-left arrow-left" onClick={() => this.state.fetchAllJobs()}>
            </button>
          </div>
          <div className="column is-two-thirds is-left">
            <h1 className="Job-title level-left">{this.state.job.title}</h1>
            <label className="level-left">{this.state.job.company}</label>
            <label className="level-left"><span className="location-pin"></span>{this.state.job.location}</label>
            <label className="level-left">{getDateParsed(this.state.job.created_at)}</label>
            <label className="mode is-pulled-left"><span>{this.state.job.type}</span></label>
          </div>
          <div className="column">
            {!this.state.job.applied ? <button className="button is-primary is-pulled-right" onClick={() => this.state.onApply(this.state.job.id)}>Apply</button>
              : <span id="applied" className="button is-outlined is-disabled is-pulled-right"> Applied </span>
            }
          </div>
        </div>

        <div className="card-content text-overflow" id="desc">
          <p>{this.state.job.description}</p>
        </div>

        <div className="card-footer column has-text-centered">
          {!this.state.job.applied && <button className="button is-primary" onClick={() => this.state.onApply(this.state.job.id)}>Apply</button>}
        </div>

      </div>
    )
  }
}

JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
  fetchAllJobs: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired
};

export default JobDetails;
