import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Accepts props contructor and returns table row (takes methods from other component)
// edit and delete buttons diplayed as links 
// "edit" is a link to edit-exercise component
// "delete" calls deleteExercise method onClick
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
// constructor
  constructor(props) 
  {
    super(props);

    // ensures correct "this" reference
    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  // lifecycle hook
  componentDidMount() {
    // gets the list from database and passes into exercises array
    axios.get('http://localhost:4000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // deletes on id
  deleteExercise(id) {
    axios.delete('http://localhost:4000/exercises/'+id)
      .then(response => { console.log(response.data)});

    // only returns desired exercises
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  // returns data in our list of exercises to be used in render()
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  // rendering our data
  render() {
    return (
      <div className="exerciseListContainer">
        <h3>Saved Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User</th>
              <th>Exercise</th>
              <th>Time</th>
              <th>Date</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}