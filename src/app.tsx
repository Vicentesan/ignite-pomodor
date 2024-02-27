import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyles } from './styles/globals'
import { defaultTheme } from './styles/themes/default'

import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}
