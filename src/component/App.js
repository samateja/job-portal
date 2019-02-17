import React from 'react';
import JobSearch from "./JobSearch";

class App  extends React.Component{
  render() {
    return (
      <div className="App has-text-centered">
        <JobSearch className="container"/>
      </div>
    )
  }
}

export default App;