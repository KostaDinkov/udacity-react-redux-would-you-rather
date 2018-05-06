import React from 'react';
import {isAuthed} from '../util/auth';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={(props) => (
            isAuthed()
                ? <Component {...props}/>
                : <Redirect to={{pathname:'/signIn', state:{from:props.location}}}/>
        )}/>
    )
;

export default PrivateRoute;
