import React, { Component } from 'react';
import axios from 'axios';// implemented to connect front to backend http requests to server

export default class CreateUser extends Component {
// constructor
  constructor(props)
  {
    super(props);

    //ensures correct reference to "this" in their respective methods
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  // Saves a user and resets box to default
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    // sends user data to backend
    axios.post('http://localhost:4000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  // html form for creating our user
  render() {
    return (
      <div className="CreateUserContainer">
        <h3>New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="button" />
          </div>
        </form>
      </div>
    )
  }
}