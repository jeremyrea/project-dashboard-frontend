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

window.freezer = freezer;

export default class Application extends React.Component{	
	constructor(props) {
		super(props);
		this.state = {projects: null,
					  showComponent: false,
					  login:'', 
					  password:''
		};
		this._onButtonClick = this._onButtonClick.bind(this);
	}
	
 	_onButtonClick() {
    	this.setState({
			projects: reqwest({
			  	url: queryString["server"] + "/projects"
				,method: 'post'
				,type: 'json'
				,contentType: 'application/json'
				,data: JSON.stringify({login: this.state.login, 
									   password: this.state.password})
				,success: resp => {
					console.log(resp)
					freezer.get().set("projects", resp)
				}
			}),
      		showComponent: true,
    	});
  	}
	
	_handleChange(name, e) {
	  	var change = {};
      	change[name] = e.target.value;
    	this.setState(change);
	}
	
	componentDidMount(){
	freezer.on('update', newvalue => this.forceUpdate());
	}

	render() {
		return (this.state.showComponent ?
           <div className="container">
				<h1>{freezer.get()['title']}</h1>
				<ProjectList projects={freezer.get()['projects']}/>
			</div> :
	   		<div style={{"position": "absolute", "top": "50%", "left": "50%", "-webkit-transform": "translate(-50%, -50%)", "transform": "translate(-50%, -50%)"}}>
					<input type="text" style={{"margin": "10px auto 0px auto"}} name="login" placeholder="Username" onChange={this._handleChange.bind(this, 'login')} /><br></br>
					<input type="password" style={{"margin": "10px auto 0px auto"}} name="password" placeholder="Password" onChange={this._handleChange.bind(this, 'password')}/><br></br><br></br>
					<button onClick={this._onButtonClick} style={{"height": "40px", "border-radius": "5px", "font-weight": "bold", "padding": "10px 20px", "display": "block", "width": "130px", "margin": "10px auto 0px auto"}}>Login</button>
			</div>
        );
	}
}



