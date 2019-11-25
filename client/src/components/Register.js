import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { apiURL } from '../config';
const api = axios.create({
  baseURL: apiURL,
})
class Create extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    api.post('/users/register', { email, password })
      .then((result) => {
        this.props.history.push("/login")
      }).catch((error) => {
        window.location.reload()
      });
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit} style={{backgroundColor:'white'}}>
          <h2 className="form-signin-heading">Register</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}
export default Create;
