import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import Login from './features/member/Login'
import SignUp from './features/member/SignUp'
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
