import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/transitionStyle.css';
import './styles/loader.css';
import './styles/select.css';
import App from './components/App';
import store from './store/index'
import { Provider } from 'react-redux';


ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.getElementById('root')
);

