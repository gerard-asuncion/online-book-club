import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";
import AppPage from "./pages/AppPage";
import ErrorPage from "./pages/ErrorPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<AppPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
