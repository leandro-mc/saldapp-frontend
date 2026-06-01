import { Route, Routes } from 'react-router-dom'
import GroupPage from './pages/GroupPage.jsx'
import HomePage from './pages/HomePage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/groups/:id' element={<GroupPage />} />
    </Routes>
  )
}

export default App
