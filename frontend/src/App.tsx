import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import ChatRoom from '../components/ChatRoom'
import HomePage from "../components/HomePage"


function App(){
  
    return(
      <>
         <BrowserRouter>
           <Routes >
              <Route path="/" element={<HomePage/>}  />

              <Route path="/room" element={<ChatRoom/>}  />
           </Routes>
         </BrowserRouter>
      </>
    )
}

export default App
