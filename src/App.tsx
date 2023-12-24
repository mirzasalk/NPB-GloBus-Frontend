import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import LogIn from "./Pages/LogIn/LogIn";
function App() {
  return (
    <div className="appMain">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/logIn" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
