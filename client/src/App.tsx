import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import './style/main.css';
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";


function App() {

  return (
    <>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
