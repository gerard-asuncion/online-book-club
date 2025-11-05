import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import RequireAuth from "./components/form/RequireAuth";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AppPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App;
