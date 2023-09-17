import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'
import type { ThemeConfig } from 'antd';

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './app/store';

const themeConfig: ThemeConfig = {
  // token color override is weird... will have to use some other way for global css
  token: {
    colorPrimary: "#BFD7EA"
  }
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={themeConfig} >
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ConfigProvider>
  </React.StrictMode>,
)
