import React, {Component} from 'react';
import Header from "./Header";
import JobForm from "./JobForm";
import * as api from '../api';
import JobList from './JobList';
import JobDetails from "./JobDetails";

/**
 * Simple Router with history object
 * @param obj
 * @param url
 */
const pushState = (obj , url) =>
  window.history.pushState(obj , '' , url);
const onPopeState = handler => {
  window.onpopstate = handler;
};

const storageKey = "jobs.applied";

/**
 * The Ultimate Container Component for the App.
 */
export default class JobSearch extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "Welcome to DevJobs",
      job:  {
        location: "",
        query: ""
      },
      jobList:[],
      errors: {},
      searching: false,
      message: "",
      currentJob: {},
      appliedJobs: []
    };

    this.searchJob = this.searchJob.bind(this);
    this.updateJobState = this.updateJobState.bind(this);
    this.jobFormIsValid = this.jobFormIsValid.bind(this);
    this.fetchAllJobs = this.fetchAllJobs.bind(this);
    this.fetchJob = this.fetchJob.bind(this);
    this.currentState = this.currentState.bind(this);
    this.applyJob = this.applyJob.bind(this);
  }

  componentDidMount(){
    onPopeState((event) => {
      this.setState({
        currentJobId : (event.state || {}).currentJobId
      });
    });

    localStorage.setItem(storageKey, JSON.stringify(this.state.appliedJobs));
  }

  componentWillUnmount(){
    onPopeState(null);
  }

  /**
   * Fallback to the default route to display all the fetched jobLists.
   */
  fetchAllJobs() {
    pushState(
      {currentJobId: null}, '/'
    );

    this.setState({
      currentJob: {},
      currentJobId: null
    })
  };

  /**
   * Fetch a particular Job
   * @param jobId {string}
   */
  fetchJob(jobId) {
    pushState(
      {currentJobId: jobId},
      `/job/${jobId}`
    );
    const index = this.state.jobList.findIndex(value => value.id === jobId);

    this.state.currentJob = Object.assign({}, this.state.jobList[index]);
    this.setState({currentJobId: jobId});
  }

  /**
   * Fires and updates the state each time when input is typed
   * @param event
   */
  updateJobState(event) {
    event.preventDefault();
    const field = event.target.name;
    let job=Object.assign({} , this.state.job);
    job[field] = event.target.value;
    return this.setState({job:job});
  }

  /**
   * A simple Query String util
   * @param query
   * @param location
   * @return {string}
   */
  static getQueryString({query, location}) {
    return `?description=${query ? query : ''}&location=${location ? location : ''}`;
  }

  /**
   * Fires the Job API and then Poll on the same to fetch results
   * @param event
   */
  searchJob(event) {
    event.preventDefault();
    this.setState({searching: true, message: null, jobList: []});
    const query = this.state.job.query;
    const location = this.state.job.location;
    const queryString = JobSearch.getQueryString({query, location});
    api.initJobSearch({queryString}).then(
      resp => {
        this.setState({message: `Loading... Your results will appear here`});
        return api.pollResults({pollId: resp.pollId})
      }
    ).then(
      resp => {
        const appliedJobs = JSON.parse(localStorage.getItem(storageKey));
        const res = resp.map(eachJob => {
          let index = appliedJobs.findIndex(applied => applied === eachJob.id);
          eachJob.applied = index > -1;
          return eachJob;
        });
        this.setState({searching: false, jobList: res, message: null});
      }
    ).catch(
      err => {
        console.error(err);
        this.setState({searching: false, message: err});
      }
    );
  }

  /**
   * Checks if the Form is valid before submit
   * @return {boolean}
   */
  jobFormIsValid() {
    let formValid = true;
    let errors = {};
    if(this.state.job.location.length < 2 || this.state.job.query.length) {
      errors.title = 'Location must be  at least 3 characters.';
      formValid = false;
    }
    this.setState({errors: errors});
    return formValid;
  }

  /**
   * Apply for a Job onApply i.e. Saves to the localStorage
   * @param jobId
   */
  applyJob(jobId) {
    this.state.appliedJobs.push(jobId);
    localStorage.setItem(storageKey, JSON.stringify(this.state.appliedJobs));
    let index = this.state.jobList.findIndex(eachJob => eachJob.id === jobId);
    this.state.jobList[index] = Object.assign(this.state.jobList[index], {applied: true});
    this.setState({
      currentJob: Object.assign({}, this.state.jobList[index])
    });

  }

  /**
   * The Actual router implementation
   * @return {*}
   */
  currentState() {
    if(this.state.currentJobId) {
      return (
        <JobDetails fetchAllJobs={this.fetchAllJobs} job={this.state.currentJob} onApply={this.applyJob} />
      );
    }

    return <div className="">
        <Header title={this.state.title} />
        <JobForm job={this.state.job}
                 onChange={this.updateJobState}
                 onSearch={this.searchJob}
                 loading={this.state.searching}
                 errors={this.state.errors}/>
        {this.state.message && <h1 className="is-1 title has-text-white">{this.state.message}</h1>}
        {this.state.searching && <div className="loader">Loading...</div>}
        <JobList jobs={this.state.jobList} fetchJob={this.fetchJob} />
      </div>

  }

  render() {
    return (
      <div className="job-search has-text-centered">
        {this.currentState()}
      </div>
    );
  }
};