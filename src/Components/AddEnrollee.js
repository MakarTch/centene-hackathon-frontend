import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default class AddEnrollee extends React.Component{
    constructor(props){
        super(props)
        this.state= this.initialState
        this.enrolleeChange = this.enrolleeChange.bind(this)
        this.submitEnrollee = this.submitEnrollee.bind(this)
    }
   
    initialState={
        firstName:'',
        lastName:'',
        birthDate:'',
        phoneNumber:'', 
        activationStatus:''
    }

    submitEnrollee(event){
        event.preventDefault();
        axios.post("http://localhost:8080/api/enrollee", {firstName:this.state.firstName, lastName:this.state.lastName, birthDate:this.state.birthDate, phoneNumber:this.state.phoneNumber, activationStatus:this.state.activationStatus})
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState)
                    alert("Enrollee saved successfully")
                    console.log(response.data)
                    this.props.history.push("/");
                }
            })
    }

    enrolleeChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.value, event.target.name)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitEnrollee} id="enrolleeFormId" autoComplete="off">
                    <label htmlFor ="firstName">First Name </label>
                    <input type="text" name="firstName" onChange={this.enrolleeChange} pattern="[A-Za-z]{0,45}" value={this.state.firstName} required></input><br/>

                    <label htmlFor ="lastName">Last Name </label>
                    <input type="text" name="lastName" onChange={this.enrolleeChange} pattern="[A-Za-z]{0,45}" value={this.state.lastName} required></input><br/>

                    <label htmlFor ="birthDate">Birth Date xx/xx/xxxx </label>
                    <input type="text" name="birthDate" onChange={this.enrolleeChange}pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" placeholder="ex: 04/06/2001" value={this.state.birthDate} required></input><br/>

                    <label htmlFor ="phoneNumber">Phone Number xxx-xxx-xxxx </label>
                    <input type="text" name="phoneNumber" onChange={this.enrolleeChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="ex 347-623-7412" value={this.state.phoneNumber}></input><br/>

                    <span><input type="radio" id="1" name="activationStatus" value="true" onClick = {this.enrolleeChange} required/>Active</span><br/>
                    <span><input type="radio" id="0" name="activationStatus" value="false" onClick = {this.enrolleeChange} required/>Inactive</span><br/>
                    <button className="create" type="submit">Create Enrollee</button>
                </form>

                <Link to ='/'><button className="create" >Home</button></Link>
            </div>
        )
    }
} 
