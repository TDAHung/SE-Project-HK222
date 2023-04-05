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
import Loading from './components/Loading'
//import Topbar from './components/Dashboard/global/Topbar'

//import style
import './App.css'
import { useState, useEffect } from 'react'
import { PublicRoute, PrivateRoute } from './components/Route'

const loadSpinner = () => {
    return new Promise(resolve=>setTimeout(()=>resolve(), 2500));
}

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loading, setLoading] = useState(true);

  // useEffect(()=>{
  //   setLoading(true);
  //   setTimeout(()=>{
  //     setLoading(false);
  //   },5000);
  // },[]);

  const componentDidMount = () =>{
    loadSpinner().then(()=>{setLoading(false)});
  }

  componentDidMount();

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
    }
  </ColorModeContext.Provider>
  )
}

export default App