import React from 'react';
import {connect} from 'react-redux';
import {setUserId} from '../util/auth';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Button, Grid, Header, Image, Message, Segment, Dropdown} from 'semantic-ui-react';

class SignIn extends React.Component {
    state = {
        selectedUser: null,
        redirectToReferrer: false
    };
    handleSignIn = (e) => {
        e.preventDefault();
        const user = this.state.selectedUser;
        if (user === 'none' || !user) {
            toast.warn('Please select user!', {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        setUserId(user);
        this.setState({redirectToReferrer: true});
    };
    handleUserSelect = (e, data) => {
        const user = data.value;
        this.setState({selectedUser: user});
    };

    usersToOptions() {
        const users = this.props.users;
        return Object.keys(users).map(k => ({
            text: users[k].name,
            value: users[k].id,
            image: users[k].avatarURL
        }));
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const message = (from.pathname === '/')
            ? `Pease sign in to continue`
            : `You must be signed in to view this page: ${from.pathname}`;
        const users = this.usersToOptions();
        if (this.state.redirectToReferrer) {
            return (
                <Redirect to={from}/>
            );
        }
        return (
            <Grid
                textAlign='center'
                style={{height: '70%', marginTop:'2%'}}

            >

                <Grid.Column style={{maxWidth: 450}}>
                    <Message
                        style={{textAlign: 'center'}}
                        header='Welcome to the Would You Rather App!'
                        attached
                        content={message}/>
                    <Segment className='attached' textAlign='center'>

                        <Image centered size='small' src='/media/logo.jpg'/>
                        <Header as='h2' color='teal' textAlign='center'>Sign in</Header>
                        <Dropdown
                            placeholder={'Select User'}
                            onChange={this.handleUserSelect}
                            fluid selection
                            options={users}
                        />


                        <Button style={{marginTop: 10}} fluid color='teal' onClick={this.handleSignIn}>Sign In</Button>
                    </Segment>
                </Grid.Column>

            </Grid>
        );
    }
}

function mapStateToProps({users}) {
    return {users};
}

export default connect(mapStateToProps)(SignIn);