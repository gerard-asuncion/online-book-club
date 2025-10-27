import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import RequireAuth from "./components/RequireAuth";
import ErrorPage from "./pages/ErrorPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<LoginPage />}/>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AppPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
