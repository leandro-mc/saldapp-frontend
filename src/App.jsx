import { Route, Routes } from 'react-router-dom'
import GroupPage from './pages/GroupPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GroupPage />} />
    </Routes>
  )
}

export default App
