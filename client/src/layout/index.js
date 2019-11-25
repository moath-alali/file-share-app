import React, { Component } from 'react'
import Home from '../pages/home'
import View from '../pages/view'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from "../history";
import TopBar from '../components/top-bar'
import Login from '../components/Login';
import Register from '../components/Register';
import Current from '../components/Current';
class Layout extends Component {
    render() {
        return (
            <div className={'app-layout'}>
                <TopBar token={
                    localStorage.getItem('jwtToken')
                } />
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/current' component={Current} />
                        <Route exact path={'/share-links/:id'} component={View} />
                    </Switch>
                </Router>
            </div>
        )
    }
}
export default Layout;