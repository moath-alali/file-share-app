import React, { Component } from 'react'
import { history } from "../history";
export default class TopBar extends Component {
	render() {
		let listItem;
		if (this.props.token) {
			listItem = <li onClick={() => {
				localStorage.removeItem('jwtToken');
				window.location.reload();
				console.log('logged out')
			}} className="user-signin-button">Logout</li>
		} else {
			listItem = <li onClick={() => {
				history.push('/login')
			}} className="user-signin-button">Sign in</li>
		}
		return (<div className="app-top-bar">
			<div className="app-top-bar-inner">
				<div className="app-top-bar-left">
					<div className="site-name">
						<i className="icon-paper-plane" />
					</div>
				</div>
				<div className="app-top-bar-right">
					<div className="app-top-bar-right-inner">
						<div className="user-profile">
							<div className="user-profile-picture">
								<img alt="avatar" src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y" />
							</div>
						</div>
						<ul className="user-profile-menu">
							{listItem}
						</ul>
					</div>
				</div>
			</div>
		</div>)
	}
}