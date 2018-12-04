import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchRooms} from '../../store/actions/user'

class SearchForm extends Component{
    handleSearch(event){
        event.preventDefault()
        let query = document.getElementById('searchRooms').value
        this.props.searchRooms(query)
    }

    render(){
        return (
            <form className="form my-3">
                <div className="row" style={{background:"#ADD8E6", height:"100px"}}>
                    <div className="col-10"><input type="text" className="form-control" id="searchRooms" placeholder="Search Room" style={{marginTop:"20px"}}/></div>
                    <div className="col-2"><button type="submit" className="btn btn-light mb-2 btn-block" onClick={this.handleSearch.bind(this)} style={{marginTop:"20px"}}>Search</button></div>
                </div>
                <br/>
                <div className="row" style={{background:"#E6E6FA", height:"500px"}}>
                <h1>Results Go here...</h1>
                </div>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        searchRooms: function(query){
            dispatch(searchRooms(query))
        }
    }
}

export default connect(null, mapDispatchToProps)(SearchForm)
