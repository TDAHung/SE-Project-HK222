// import Router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ColorModeContext, useMode } from './components/Dashboard/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

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
//import Topbar from './components/Dashboard/global/Topbar'

//import style
import './App.css'
import { Theme } from '@ant-design/cssinjs'
import { useState } from 'react'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className='app'>
      <main className='content'>
        <Routes>
          <Route path={pages.LOGIN} element={<Login/>} />
          <Route path={pages.DASHBOARD} element={<DashboardLayout isSidebar={isSidebar}/>}>
            <Route path={pages.ASSIGN} element={<Assign />} /> 
            <Route path={pages.HISTORY} element={<History />}/>
            <Route path={pages.CHAT} element={<Chat />}/>
            <Route path={pages.PROFILE} element={<Profile />}/>
            <Route path={pages.SETTING} element={<Setting />}/>
          </Route>
        </Routes>
      </main>
    </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  )
}

export default App