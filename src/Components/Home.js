import React from "react"
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../Services/APIService'
import APIService from "../Services/APIService"

class Home extends React.Component{
    constructor(props){
        super(props)
        this.deleteEnrollee = this.deleteEnrollee.bind(this)
        this.deleteDependent = this.deleteDependent.bind(this)
        this.state={
            enrollees:[],
            dependents:[]
        }
    }

    componentDidMount(){
        this.findEnrollees()
        this.findDependents()
    }

    findEnrollees(){
        var url = "http://localhost:8080/api/enrollee"
        axios.get(url)
            .then(response => response.data)
            .then((data) => {
                this.setState({enrollees:data})
                //console.log(data)
            })
    }
    
    findDependents(){
        var url = "http://localhost:8080/api/dependent"
        axios.get(url)
            .then(response => response.data)
            .then((data) => {
                this.setState({dependents:data})
                //console.log(data)
            })
    }
    

    displayDependent(enrolleeId){
        var updateDependentUrl = (dependentId) => '/updateDependent/' + dependentId
        var displayArray=[]
        this.state.dependents.forEach((dependent) =>{
            var displayText = 
                <div>
                    <p>
                        - {dependent.id} | {dependent.firstName} {dependent.lastName} | {dependent.birthDate}
                        <button className="delete" onClick={() => this.deleteDependent(dependent.id)}>Delete Dependent</button>
                        <Link to = {updateDependentUrl(dependent.id)} ><button className="update">Update Dependent Info</button></Link>
                    </p>
                </div>
            if(dependent.enrolleeId === enrolleeId){
                displayArray.push(
                <div key={dependent.id}>
                    {displayText}
                </div>
            );
            }
        })
            
        return (
            <div style={{marginLeft:"5%"}}>
                {displayArray}
            </div>
        )
    }

    deleteEnrollee = (enrolleeId) => {
        new APIService().deleteEnrolleeById(enrolleeId)
    }
    deleteDependent =(dependentId)=>{
        console.log(dependentId)
        new APIService().deleteDependentById(dependentId)
    }

    

    render(){
        var addDependentUrl = (enrolleeId) => '/addDependent/' + enrolleeId
        var updateEnrolleeUrl = (enrolleeId) => '/updateEnrollee/' + enrolleeId
        return(
            <div>
                <Link to = '/addEnrollee'><button className="createBig">Add an Enrollee</button></Link>
                <a target="_blank" href="http://localhost:8080/swagger-ui.html#/"><button className="createBig">View Swagger UI</button></a>
                {this.state.enrollees.map ((enrollee) =>(
                    <div key={enrollee.id} className= {enrollee.activationStatus?'active':'inactive' } >
                        <p style={{fontSize:"1.1em"}}>{enrollee.id} | {enrollee.firstName} {enrollee.lastName} | {enrollee.birthDate} | {enrollee.phoneNumber} {enrollee.activationStatus?<span style={{float:"right", margin:"10px", fontWeight:"bold", color:"green"}}>Active Account</span>:<span style={{float:"right", margin:"10px", fontWeight:"bold", color:"rgb(255, 77, 77)"}}>Inactive Account</span>}</p>
                        <button className="delete" style={{fontSize:"1em"}} id={enrollee.id} onClick={() => this.deleteEnrollee(enrollee.id)}>Delete Enrollee</button>
                        <Link to = {updateEnrolleeUrl(enrollee.id)} ><button style={{fontSize:"1em"}} className="update">Update Enrollee Info</button></Link><hr/>
                        {(this.state.dependents.length >= 0) && (this.displayDependent(enrollee.id))}
                        
                        <Link to = {addDependentUrl(enrollee.id)} ><button className="create">Add a Dependent for {enrollee.firstName}</button></Link>

                    </div>
                ))}
            </div>
        )
    }
}
export default Home;
