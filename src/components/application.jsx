import React from 'react';
import Freezer from 'freezer-js';
import querystringparser from 'querystringparser';
import reqwest from 'reqwest';

import ProjectList from 'components/projectlist';
import emptystate from 'emptystate';
import exampleProjects from 'exampleprojectsdata';

const freezer = new Freezer(emptystate);

var queryString = {}
if(window.location.search !== ""){
  queryString = querystringparser.parse(window.location.search.substr(1));
}

var projectsSetter = () => {
  freezer.get().set("projects", exampleProjects);
}

if(queryString["server"]){
  projectsSetter = () => {
    reqwest({
//        url: queryString["server"] + "/projects"
		url: "0.0.0.0:1357/projects"
      , method: 'post'
      ,type: 'json'
	,data: {"id" : "Jeremy"}	
      , success: resp => {
          console.log(resp)
          freezer.get().set("projects", resp)
        }
    })
  }
}
projectsSetter();

window.freezer = freezer;

export default class Application extends React.Component{
  componentDidMount(){
    freezer.on('update', newvalue => this.forceUpdate());
  }
  render(){
    const state = freezer.get();
    return (<div className="container">
      <h1>{state.title}</h1>
      <ProjectList projects={state.projects}/>
    </div>);
  }
}
