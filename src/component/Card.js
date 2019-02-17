import React from 'react';
import PropTypes from 'prop-types';

/**
 * Trim a really long string to the n number characters given as input
 * @param n
 * @param useWordBoundary
 * @return {*}
 */
function truncate( n, useWordBoundary ){
  if (this.length <= n) { return this; }
  var subString = this.substr(0, n-1);
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(' '))
    : subString) + "&hellip;";
}

/**
 * {Component} - Generic Card Component to display the Jobs
 */
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(Object.assign({}, nextProps));
  }

  componentDidMount() {
    let description = this.state.description;
    let desc =  document.getElementById(this.state.jobId + "-desc");
    desc.innerHTML = truncate.apply(description, [300, true]);
  }

  render() {
    return (
      <a className="link">
        <div className="card fixed-size" onClick={() => this.state.onClick(this.state.jobId)}>
          <div className="card-header columns">
              <div className="column is-four-fifths">
                <div className="columns is-multiline">
                  <div className="column is-pulled-left card-job-title">
                    <label className="job-title is-pulled-left">{this.state.jobTitle}</label>
                    {this.state.applied && <button className="button is-outlined is-disabled" id="applied">Applied</button>}
                  </div>
                  <div className="column is-full card-company">
                    <label className="is-pulled-left">{this.state.company}</label>
                  </div>
                </div>
              </div>
              <div className="column">
                <span className="mode"><span>{this.state.mode}</span></span>
              </div>
          </div>
          <div className="card-content">
            <div id={this.state.jobId + "-desc"} className="no-text-overflow"></div>
          </div>
          <div className="card-footer columns is-multiline">
            <div className="column is-full no-padding-top">
              <label className="is-pulled-left"><span className="location-pin font-inherit"></span>{this.state.location}</label>
            </div>
            <div className="column is-full no-padding-top">
              <time className="is-pulled-left">{this.state.date}</time>
            </div>
          </div>
        </div>
      </a>
    )
  }

}

Card.propTypes = {
  jobId: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  applied: PropTypes.bool.isRequired,
};

export default Card;