import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';

import './styles/nav.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from 'react-router-dom';
import middleware from './middleware';


const store = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>

        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);


