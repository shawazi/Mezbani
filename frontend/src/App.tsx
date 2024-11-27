import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import Order from './pages/Order'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="events" element={<Events />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
