import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import './style/main.css';
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import PublicRoutes from "./router/PublicRoutes";


function App() {

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <Homepage />
            }
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
