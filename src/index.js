import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import './index.css';
import '../semantic/dist/semantic.min.css'

import App from './App';
import Main from './layouts/Main'
import Charts from './layouts/Charts'
import Wallet from './layouts/Wallet'
import NotFound from './layouts/NotFound'

import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}> 
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            <Route path="/frontend-task/" component={App}>
                <IndexRoute component={Main}/>
                <Route path="/frontend-task/charts" component={Charts} />
                <Route path="/frontend-task/wallet" component={Wallet} />    
                <Route path="/frontend-task/*" component={NotFound} />
            </Route>
        </Router>
    </Provider>, 
    document.getElementById('root')
);
