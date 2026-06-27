import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import './style/main.css';
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import PublicRoutes from "./router/PublicRoutes";
import MediaPage from "./pages/MediaPage";
import ProtectedRoutes from "./router/ProtectedRoutes";
import { LoaderProvider } from "./context/LoaderContext";
import Profile from "./pages/Profile";


function App() {

  return (
    <>
      <AuthProvider>
        <LoaderProvider>
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
            <Route
              path="/media/:type/:id"
              element={
                <ProtectedRoutes>
                  <MediaPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

          </Routes>
        </LoaderProvider>
      </AuthProvider>
    </>
  )
}

export default App
