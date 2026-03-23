import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import AddBook from './pages/AddBook.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App