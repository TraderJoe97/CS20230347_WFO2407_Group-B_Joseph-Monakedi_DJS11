import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PodcastDetails from './pages/PodcastDetails.tsx'

function RootLayout() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<PodcastDetails />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default RootLayout

