import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Signin from "./pages/Signin";
import ToDoList from "./pages/ToDoList";
import TablicaPage from "./pages/TablicaPage";
import { Container } from "@mui/material";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/signin" index element={<Signin />} />
          <Route path="/todolist" index element={<ToDoList />} />
          <Route path="/tablica" index element={<TablicaPage />} />
          <Route path="/test" index element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
