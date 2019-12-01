import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";// calender style

export default class CreateExercise extends Component {
// constructor
  constructor(props) 
  {
    super(props);

    // ensures "this" keyword in onChange...methods referes to correct object/item
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount()
   {
       // gets data from backend and makes sure there is a response
        axios.get('http://localhost:4000/users/')
        .then(response => {
            if (response.data.length > 0) {
            this.setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
            })
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  // updates username element
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  // updates description element
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  // updates duration element
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  // updates date element (uses calender box) NOTE: Mayb require nmp install datepicker
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  // submit clicked, overrides default html functionality of submit
  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    // sends user data to backend
    axios.post('http://localhost:4000/exercises/add', exercise)
      .then(res => console.log(res.data));

      // takes user back to home
    window.location = '/';
  }

  // html form for creating our exercise
  render() {
    return (
    <div className="CreateExerciseContainer">
      <h3>Create New Exercise</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>User: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                // handles a select box for users drop down
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Time (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise" className="button" />
        </div>
      </form>
    </div>
    )
  }
}