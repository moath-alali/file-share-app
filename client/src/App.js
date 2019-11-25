import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  render() {
    return (
      <div className="container">
        <p>This is the home page</p>
      </div>
    );
  }
}
export default App;
