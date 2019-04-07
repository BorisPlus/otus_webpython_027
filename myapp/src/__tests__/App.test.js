import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReduxApp from "../../src/App";
import store from "../../src/store/index";


it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <ReduxApp />
    </Provider>
  </BrowserRouter>,
  div);
  ReactDOM.unmountComponentAtNode(div);
});
