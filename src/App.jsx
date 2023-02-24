import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './Navbar'
import Users from './Users'
import UserCreate from './UserCreate'
import UserEdit from './UserEdit'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Users /> } />
      <Route path="/create" element={ <UserCreate /> } />
      <Route path="/edit/:id" element={ <UserEdit /> } />
    </Routes>
    </>
  )
}

export default App