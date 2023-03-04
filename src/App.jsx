// import Router
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//import constant
import { pages } from './utils/constants'

//import pages
import Assign from './components/Assign'
import DashboardLayout from './components/Dashboard'
import History from './components/History'
import Login from './components/Login'
import Profile from './components/Profile'
import Setting from './components/Setting'
import Chat from './components/Chat'

//import style
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={pages.DASHBOARD} element={<DashboardLayout />}>
          <Route index element={<Assign />} /> {/* assign task */}
          <Route path={pages.HISTORY} element={<History />} />
          <Route path={pages.CHAT} element={<Chat />} />
          <Route path={pages.PROFILE} element={<Profile />} />
          <Route path={pages.SETTING} element={<Setting />} />
        </Route>

        <Route path={pages.LOGIN} element={<Login />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
