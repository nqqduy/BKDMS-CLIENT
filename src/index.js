import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

import store from './app/store';

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading... </div>}>
            <App />
        </Suspense>
    </Provider>,
    document.getElementById('root')
);
