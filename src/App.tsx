import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PodcastDetails from './pages/PodcastDetails.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store' 
import Seasons from './pages/Seasons.tsx'
import Episodes from './pages/Episodes.tsx'
import { saveStateToLocalStorage } from '@/app/browser-storage.ts'
import debounce from 'debounce'

store.subscribe(() => {
  debounce(() => saveStateToLocalStorage(store.getState()), 1000)
})
function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="show/:id" element={<PodcastDetails />} >
               <Route index element={<Seasons />} />
               <Route path="season/:seasonId" element={<Episodes />} />

              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default RootLayout

