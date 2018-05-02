import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    const authedUser = this.props.authedUser;
    if (authedUser) {
      console.log('Authed : ', authedUser);
    }

    return (
      <div id='cssmenu'>
        <ul>
           <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li>
           <li><NavLink exact to='/newQuestion' activeClassName ='active'>New Question</NavLink></li>
           <li><NavLink exact to='/leaderBoard' activeClassName = 'active'>Leader Board</NavLink></li>
          {/* Todo add logout link*/}
          {authedUser && (<span id='authedUser'>Hello, {authedUser.name}</span>)}
          {authedUser && (<li><a href='#'>Logout</a></li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);