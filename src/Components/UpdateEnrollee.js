import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default class UpdateEnrollee extends React.Component{
    constructor(props){
        super(props)
        this.state= {}
        this.enrolleeChange = this.enrolleeChange.bind(this)
        this.submitEnrollee = this.submitEnrollee.bind(this)
        this.displayRadioButtons = this.displayRadioButtons.bind(this)
    }


    componentDidMount(){
        var r = /\d+/;
        var s = window.location.pathname
        this.findEnrollee(s.match(r)[0])
    }

    findEnrollee(enrolleeId){
        var url = "http://localhost:8080/enrollee/findById/" + enrolleeId
        axios.get(url)
            .then(response => response.data)
            .then((data) => {
                this.setState(data)
                //console.log(data)
            })
    }



    submitEnrollee(event){
        event.preventDefault();
        var r = /\d+/;
        var s = window.location.pathname
        var id = s.match(r)[0]
        axios.put("http://localhost:8080/enrollee/update/" + id, {id: this.state.id, firstName:this.state.firstName, lastName:this.state.lastName, birthDate:this.state.birthDate, phoneNumber:this.state.phoneNumber, activationStatus:this.state.activationStatus})
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState)
                    alert("Enrollee updated successfully")
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
        console.log(this.state)
        console.log("first name", this.state.firstName)
        
    }
    
    displayRadioButtons = activationStatus =>{
        if (activationStatus === true){
            return(
                <>
                    <span><input type="radio" id="1" name="activationStatus" value="true" onClick = {this.enrolleeChange} defaultChecked required/>Active</span><br/>
                    <span><input type="radio" id="0" name="activationStatus" value="false" onClick = {this.enrolleeChange}  required/>Inactive</span><br/>
                </>
            )
        }else{
            return(
                <>
                    <span><input type="radio" id="1" name="activationStatus" value="true" onClick = {this.enrolleeChange}  required/>Active</span><br/>
                    <span><input type="radio" id="0" name="activationStatus" value="false" onClick = {this.enrolleeChange} defaultChecked  required/>Inactive</span><br/>
                </>
            )
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitEnrollee} id="enrolleeFormId" autoComplete="off">
                    <label htmlFor ="firstName">First Name </label>
                    <input type="text" name="firstName" onChange={this.enrolleeChange} pattern="[A-Za-z]{0,45}" defaultValue={this.state.firstName} required></input><br/>

                    <label htmlFor ="lastName">Last Name </label>
                    <input type="text" name="lastName" onChange={this.enrolleeChange} pattern="[A-Za-z]{0,45}" defaultValue={this.state.lastName} required></input><br/>

                    <label htmlFor ="birthDate">Birth Date xx/xx/xxxx </label>
                    <input type="text" name="birthDate" onChange={this.enrolleeChange}pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" value={this.state.birthDate} required></input><br/>

                    <label htmlFor ="phoneNumber">Phone Number xxx-xxx-xxxx </label>
                    <input type="text" name="phoneNumber" onChange={this.enrolleeChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={this.state.phoneNumber}></input><br/>
                    
                    {this.displayRadioButtons(this.state.activationStatus)}
                    <button className="create" type="submit">Update Enrollee</button>
                </form>
                <Link to ='/'><button className="update" >Home</button></Link>
            </div>
        )
    }
} 
