import React from 'react'
import axios from 'axios'

export default class APIService extends React.Component{

    deleteEnrolleeById = (enrolleeId) => {
        axios.delete("http://localhost:8080/enrollee/delete/"+ enrolleeId)
            .then(response => {
                if (response.data != null) {
                    alert("Enrollee Deleted Successfully")
                    console.log(response.data)
                    window.location.reload(false);
                }
            })
    }

    deleteDependentById = (dependentId) => {
        axios.delete("http://localhost:8080/dependent/delete/"+ dependentId)
            .then(response => {
                if (response.data != null) {
                    alert("Dependent Deleted Successfully")
                    console.log(response.data)
                    window.location.reload(false);
                }
            })
    }

}