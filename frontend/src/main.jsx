import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './context/ChatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <BrowserRouter>

      <NextUIProvider>
        <App />
      </NextUIProvider>

    </BrowserRouter>
  </ChatProvider>,
)
