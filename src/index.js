import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import reducer from './reducers';
import './styles/nav.css';
import 'react-toastify/dist/ReactToastify.css';
import middleware from './middleware';
import App from './components/App';


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


