import React, { Component } from 'react';
import axios from 'axios';
import { apiURL } from '../config';
const api = axios.create({
    baseURL: apiURL,
})
class Current extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }
    componentDidMount() {
        api.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        api.get('/users/current')
            .then(res => {
                this.setState({ 'name': res.data.name });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    }
    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }
    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            BOOK CATALOG &nbsp;
                            {localStorage.getItem('jwtToken') &&
                                <button style={{ marginTop: 50 }} className="btn btn-primary" onClick={this.logout}>Logout</button>
                            }
                        </h3>
                    </div>
                    <div className="panel-body">
                        <p>{this.state.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Current;
