import "./App.css";
import Layout from "./Components/Layout/Layout";
import ShowAlldata from "./Components/Menu/ShowDataModal";
import { AuthProvider } from "./DataContext";
import Login from "./Pages/Home/Login/Login";
import Signup from "./Pages/Home/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/showalldata" element={<ShowAlldata />} />
          
          </Routes>
        </BrowserRouter>
        </AuthProvider>
    </>
  );
}

export default App;
