import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default class UpdateDependent extends React.Component{
    constructor(props){
        super(props)
        var r = /\d+/;
        var s = window.location.pathname
         
        this.state= {
        }
        this.dependentChange = this.dependentChange.bind(this)
        this.submitDependent = this.submitDependent.bind(this)
    }


    componentDidMount(){
        var r = /\d+/;
        var s = window.location.pathname
        this.findDependent(s.match(r)[0])
    }

    findDependent(dependentId){
        var url = "http://localhost:8080/dependent/findById/" + dependentId
        axios.get(url)
            .then(response => response.data)
            .then((data) => {
                this.setState(data)
                //console.log(data)
            })
    }



    submitDependent(event){
        event.preventDefault();
        event.preventDefault();
        var r = /\d+/;
        var s = window.location.pathname
        var id = s.match(r)[0]
        axios.put("http://localhost:8080/dependent/update/"+id , {id: this.state.id, enrolleeId:this.state.enrolleeId, firstName:this.state.firstName, lastName:this.state.lastName, birthDate:this.state.birthDate})
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState)
                    alert("Dependent updated successfully")
                    this.props.history.push("/");
                }
            })
    }

    dependentChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.value, event.target.name)
        console.log(this.state)
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.submitDependent} id="dependentFormId" autoComplete="off">
                    <label htmlFor ="firstName">First Name </label>
                    <input type="text" name="firstName" onChange={this.dependentChange} pattern="[A-Za-z]{0,45}" defaultValue={this.state.firstName} required></input><br/>

                    <label htmlFor ="lastName">Last Name </label>
                    <input type="text" name="lastName" onChange={this.dependentChange} pattern="[A-Za-z]{0,45}" defaultValue={this.state.lastName} required></input><br/>

                    <label htmlFor ="birthDate">Birth Date </label>
                    <input type="text" name="birthDate" onChange={this.dependentChange}pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" defaultValue={this.state.birthDate} required></input><br/>

                    <button className="create" type="submit">Update Dependent</button>
                </form>
                <Link to ='/'><button className="update" >Home</button></Link>
            </div>
        )
    }
} 
