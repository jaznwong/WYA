import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSuggestInterests, postInterests, postAvailablity} from './store/actions/user'
import Select from 'react-select'
import DatetimeRangePicker from 'react-datetime-range-picker'

class Profile extends Component{
    /** Dcoumentation
    *       - Access suggested interests through this.props.suggestedInterests
    *       - Post user interests to the database by running, this.props.postInterests(interests)
    *       - Post user availability to the database by running this.props.postAvailability(availabilities)
    *       - The postAvailability and PostInterests returns a promise. You should wait for those two promises
    *           to resolve before going to a new page
    *       - Update suggestedInterests by running this.props.handleSuggestInterests(userSearch)
    *           whenever the user types something in the interest search bar
    */

    constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.setState = this.setState.bind(this);

    this.state = {
      interests: [],
      time: [],
      timeComponents: [],
      count: 0
    };
  }

  handleClick = (e) =>{
    let interest = this.state.interests;
    this.props.postInterests(interest);
    let time = this.state.time
    this.props.postAvailablity(time);
    console.log(time)
  }

  handleTimeClick = () =>{
    let count = this.state.count
    // console.log(count)
    let timeComponents = this.state.timeComponents
    timeComponents.push(
      <div style={{float:"center", width:"16%",marginLeft:"41%"}}>
      <DatetimeRangePicker onChange={(e) => {this.what(e,count)}}
      timeFormat= "hh:mm a"/>
   <br></br>
   </div>)
   let time = this.state.time
   console.log(time)
   time.push([0,0])
    this.setState({
      count: count + 1,
      timeComponents: timeComponents,
      time: time
    });
  }

  what = (data, index) => {
    console.log(data)
    console.log(index)
    let time = this.state.time
    time[index] = [data.start, data.end]
  }

  handleChange(selectedOption) {
    let values = selectedOption.map((item)=>(item.value))
    this.setState({ interests: values});
  }

    render(){
      let interests = this.props.suggestedInterests.map((item,key)=>(
        { value: item, label: item }
      ))
        return(
          <div style = {{textAlign: "center"}}>
          <div className="Jumbotron" style={{backgroundColor:"#9eadd1"}}>
              <h2 style={{color:"white"}}> What are your interests? </h2>
              <div className="FormGroup" >
              <div className="Row show-grid">
                 <div className="Col" md={12} sm={12}>
                 <div style={{float:"center", width:"50%",marginLeft:"25%"}}>
                 <Select
                      isMulti
                      name="colors"
                      options={interests}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={this.handleChange}
                  />
                  </div>
                  </div>
              </div>
              </div>
              <br></br>
              <h2 style={{color:"white"}}> What times are you available? </h2>
              <times>
              {this.state.timeComponents}
              </times>
             <br></br>
           <button onClick={this.handleTimeClick.bind(this)}>Add time</button>
             <br></br>
             <br></br>
          <button onClick={this.handleClick.bind(this)}>Save</button>
          </div>
          </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        suggestedInterests: reduxState.user.suggestedInterests
    }
}

function mapDispatchToProps(dispatch){
    return{
        postInterests,
        postAvailablity,
        handleSuggestInterests: function(query){
            return dispatch(handleSuggestInterests(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
