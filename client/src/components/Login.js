import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import { apiURL } from '../config';
const api = axios.create({
  baseURL: apiURL,
})
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: ''
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
    api.post('/users/login', { email, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        window.location.assign('/')
      })
      .catch((error) => {
        window.location.reload();
        if (error.response.status === 401) {
          this.setState({ message: 'Login failed. email or password not match' });
        }
      });
  }
  render() {
    const { email, password, message } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit} style={{backgroundColor:'white'}}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              {message}
            </div>
          }
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}
export default Login;
