import React, {Fragment} from 'react';
import * as auth from '../util/auth';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class Nav extends React.Component {
    render() {
        const authedUser = this.props.users[auth.getUserId()];


        return (
            <div id='cssmenu'>
                <ul>
                    <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li>
                    <li><NavLink to='/newQuestion' activeClassName='active'>New Question</NavLink></li>
                    <li><NavLink to='/leaderBoard' activeClassName='active'>Leader Board</NavLink></li>
                    {/* Todo add logout link*/}
                    {authedUser
                        ? <Fragment>
                            <span id='authedUser'>Hello, {authedUser.name}</span>
                            <li>
                                <Link to='/logout'>Logout</Link>
                            </li>
                        </Fragment>
                        : null
                    }

                </ul>
            </div>
        );
    }
}

function mapStateToProps({users}) {
    return {users};
}


export default withRouter(connect(mapStateToProps)(Nav));