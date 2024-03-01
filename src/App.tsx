import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Signin from "./pages/Signin";
import ToDoList from "./pages/ToDoList";
import TablicaPage from "./pages/TablicaPage";
import { Container } from "@mui/material";
import TestPage from "./pages/TestPage";
import ColumnMenuPage from "./pages/ColumnMenuPage";

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
          <Route path="/column" index element={<ColumnMenuPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
