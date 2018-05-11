import React, {Fragment} from 'react';
import * as auth from '../util/auth';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Grid, Image} from 'semantic-ui-react';
import {MAX_COMPONENT_WIDTH} from '../util/config';

class Nav extends React.Component {
    render() {
        const authedUser = this.props.users[auth.getUserId()];
        return (
            <Grid centered padded style={{borderBottom: '3px solid #00b5ad'}}>
                <Grid.Column style={{maxWidth: MAX_COMPONENT_WIDTH * 1.5, paddingBottom: 0}}>
                    <div id='cssmenu'>
                        <ul>
                            <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li>
                            <li><NavLink to='/newQuestion' activeClassName='active'>New Question</NavLink></li>
                            <li><NavLink to='/leaderBoard' activeClassName='active'>Leader Board</NavLink></li>

                            {authedUser
                                ? <Fragment>
                                    <li style={{float: 'right'}}>
                                        <Link to='/logout'>Logout</Link>
                                    </li>
                                    <Image src={authedUser.avatarURL} avatar/>
                                    <span id='authedUser'>Hello, {authedUser.name}</span>
                                </Fragment>
                                : null
                            }
                        </ul>
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

function mapStateToProps({users}) {
    return {users};
}

export default withRouter(connect(mapStateToProps)(Nav));

