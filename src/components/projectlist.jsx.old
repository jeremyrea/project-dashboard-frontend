import React from 'react';

import Project from 'components/project'

export default class ProjectList extends React.Component{
  render(){

    const projects = this.props.projects || [];

    return (
    <div className="sm-flex flex-wrap mxn2">
      { projects.map( (project,i) => {
        return <Project key={i} project={project} />
      })}
    </div>)
  }
}

ProjectList.propTypes = {
  projects: React.PropTypes.array
};
