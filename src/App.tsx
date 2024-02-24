
import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";
import "./App.css";
import LoginPage from './pages/LoginPage';
import Signin from './pages/Signin';
import { Container } from "@mui/material";


function App () {

  return (
  <Container>
    
    <BrowserRouter>
    <Routes>
      <Route path="/login" index element={<LoginPage />}/>
      <Route path="/signin" index element={<Signin />}/>
    </Routes>
    </BrowserRouter>

  </Container>

  )

}

export default App;