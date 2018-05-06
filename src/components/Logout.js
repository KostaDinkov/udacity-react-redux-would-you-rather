import React from 'react'
import {Redirect} from 'react-router-dom'
import {logout} from '../util/auth';

const Logout = ()=>{
    logout();
    return (
        <Redirect to={'/'} />
    )
};

export default Logout;

