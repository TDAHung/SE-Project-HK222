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
import New from './components/New'
import NewMCP from './components/New/MCP'
import NewUser from './components/New/User'
import NewVehicle from './components/New/Vehicle'
import Setting from './components/Setting'
import Chat from './components/Chat'
import Loading from './components/Loading'
//import Topbar from './components/Dashboard/global/Topbar'

//import style
import './App.css'
import { useState, useEffect } from 'react'
import { PublicRoute, PrivateRoute, AdminRoute } from './components/Route'
import Test from './components/Test'
import Schedule from './components/Schedule'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1500);
  },[]);


  return (<ColorModeContext.Provider value={colorMode}>
    {loading ? <Loading/> :
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className='app'>
      <main className='content'>
        <Routes>
          <Route path={pages.LOGIN} element={<PublicRoute><Login/></PublicRoute>} 
          />
          <Route path={pages.DASHBOARD} element={<PrivateRoute><DashboardLayout isSidebar={isSidebar}/></PrivateRoute>}>
            <Route path={pages.TEST} element={<AdminRoute><Test /></AdminRoute>} />

            <Route path={pages.ADD} element={<AdminRoute><New /></AdminRoute>}>
              <Route path={pages.MCP} element={<AdminRoute><NewMCP /></AdminRoute>}/>
              <Route path={pages.USER} element={<AdminRoute><NewUser /></AdminRoute>}/>
              <Route path={pages.VEHICLE} element={<AdminRoute><NewVehicle/></AdminRoute>}></Route>
            </Route>

            <Route path={pages.ASSIGN} element={<Assign />} /> 
            <Route path={pages.HISTORY} element={<History />}/>
            <Route path={pages.CHAT} element={<Chat />}/>
            <Route path={pages.PROFILE} element={<Profile />}/>
            <Route path={pages.SCHEDULE} element={<Schedule />}/>
            <Route path={pages.SETTING} element={<Setting />}/>
          </Route>
        </Routes>
      </main>
    </div>
    </ThemeProvider>
    }
  </ColorModeContext.Provider>
  )
}

export default App