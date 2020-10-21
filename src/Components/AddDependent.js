import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default class AddDependent extends React.Component{
    constructor(props){
        super(props)
        this.state= this.initialState
        this.dependentChange = this.dependentChange.bind(this)
        this.submitDependent = this.submitDependent.bind(this)
    }
   
    initialState={
        firstName:'',
        lastName:'',
        birthDate:'',
    }

    submitDependent(event){
        var r = /\d+/;
        var s = window.location.pathname
        event.preventDefault();
        axios.post("http://localhost:8080/dependent/post", {enrolleeId:s.match(r)[0], firstName:this.state.firstName, lastName:this.state.lastName, birthDate:this.state.birthDate})
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState)
                    alert("Dependent saved successfully")
                    console.log(response.data)
                    this.props.history.push("/");
                }
            })
    }

    dependentChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitDependent} id="dependentFormId" autoComplete="off">
                    <label htmlFor ="firstName">First Name </label>
                    <input type="text" name="firstName" onChange={this.dependentChange} pattern="[A-Za-z]{0,45}"  required></input><br/>

                    <label htmlFor ="lastName">Last Name </label>
                    <input type="text" name="lastName" onChange={this.dependentChange} pattern="[A-Za-z]{0,45}" required></input><br/>

                    <label htmlFor ="birthDate">Birth Date xx/xx/xxxx </label>
                    <input type="text" name="birthDate" onChange={this.dependentChange} pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" placeholder="ex: 04/06/2001" required></input><br/>

                    <button className="create" type="submit">Create Dependent</button>
                </form>

                <Link to ='/'><button className="update" >Home</button></Link>
            </div>
        )
    }
} 
