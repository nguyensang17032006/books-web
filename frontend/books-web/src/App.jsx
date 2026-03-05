import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import AddBook from './pages/AddBook'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App