import { Routes, Route } from "react-router-dom";
import AppPage from "./pages/AppPage";
import AuthRouter from "./components/AuthRouter";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthRouter />}>
          <Route path="/" element={<AppPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
