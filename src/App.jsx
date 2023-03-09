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
import Register from './components/Register'

//import style
import './App.css'

function App() {

  return (
    <Routes>
      <Route path={pages.LOGIN} element={<Login/>} />
      <Route path={pages.REGISTER} element={<Register/>}/>
      <Route path={pages.DASHBOARD} element={<DashboardLayout/>}>
        <Route index element={<Assign />} /> 
        <Route path={pages.HISTORY} element={<History />}/>
        <Route path={pages.CHAT} element={<Chat />}/>
        <Route path={pages.PROFILE} element={<Profile />}/>
        <Route path={pages.SETTING} element={<Setting />}/>
      </Route>
    </Routes>
  )
}

export default App
