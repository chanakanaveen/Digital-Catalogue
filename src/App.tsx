import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { EntryScreen } from './screens/EntryScreen'
import { CategoryScreen } from './screens/CategoryScreen'
import { CatalogueScreen } from './screens/CatalogueScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryScreen />} />
        <Route path="/categories" element={<CategoryScreen />} />
        <Route path="/catalogue/:categoryId" element={<CatalogueScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
