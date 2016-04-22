import React from 'react';

export default class Project extends React.Component{
  render(){
    const project = this.props.project;
    const contributors = project.contributors || [];
    const languages = project.languages || {};
    const openIssues = project.openIssues || project.open_issues || [];


    let open_issues_count = project.openIssues ? project.openIssues.length : project["open_issues_count"];


    const openIssuesCountSection = (props => {
      let obj={cn:"white bg-red",txt:"Could not retrieve issues"};

      if(open_issues_count === 0){
        obj={cn:"white bg-green", txt:"0 issues"};
      }
      else if(open_issues_count === 1){
        obj={cn:"white bg-yellow", txt:"1 issue"};
      }
      else if(open_issues_count <= 3){
        obj={cn:"white bg-yellow", txt:`${open_issues_count} issues`};
      }
      else if(open_issues_count > 3){
        obj={cn:"white bg-red", txt:`${open_issues_count} issues`};
      }

      return <a href={project.html_url + "/issues"} className={obj.cn + " p2 rounded col-5"}>{obj.txt}</a>;
    })();

    const openIssueSection = (props => {
        if(open_issues_count === 0){
            return "No open issue.";
        }
        return openIssues.map((issue) => (<div> <a href={issue.html_url}> # {issue.id || ''}: {issue.title} </a></div>))

    })();

    return (<div className="sm-col-6 lg-col-4 border-box flex flex-stretch flex-wrap bg-dgray radius m2 ac-flex-start">
              <div className="col-12 border-bottom py1 px2">
                <a className="white" href={project.html_url}>{project.name}</a>
              </div>
              <div className="col-12 flex p2 flex-jc-space-around">
                { openIssuesCountSection }
                <ul className="col-5">
                {Object.keys(languages).map( (k) => {
                  return <li key={k}>{k}: {languages[k]}</li>
                })}
                </ul>
              </div>
              <div className="border-bottom">Contributors</div>
              <ul className="col-12 list-style-none flex flex-wrap jc-space-between p0 m0">
              {contributors.map( (contributor) => {
                return <li className="p2" key={contributor.login}><a href={contributor.html_url}><img height="48px" width="48px" src={contributor.avatar_url} alt={contributor.login}/></a></li>
              })}
              </ul>
            {openIssueSection}
            </div>)
  }
}

Project.propTypes = {
  project: React.PropTypes.object.isRequired
};


