import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import './styles/transitionStyle.scss';
import './styles/loader.scss';
import './styles/select.scss';
import App from './components/App';
import store from './store/index'
import { Provider } from 'react-redux';


ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.getElementById('root')
);

