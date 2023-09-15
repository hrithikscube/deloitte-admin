import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { render } from 'react-dom'
import reportWebVitals from './reportWebVitals'
const THEME = createTheme({
  typography: {
    fontFamily: [
      'Nunito Regular',
      'Nunito Medium',
      'Nunito Bold',
      'Nunito SemiBold',
      'Nunito Light',
    ].join(','),
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

render(
  <ThemeProvider theme={THEME}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
