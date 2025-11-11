import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ActiveBooksGridPage from "./pages/ActiveBooksGridPage";
import BooksGridPage from "./pages/BooksGridPage";
import ChatPage from "./pages/ChatPage";
import ChatHistorialPage from "./pages/ChatHistorialPage";
import SettingsPage from "./pages/SettingsPage";
import RequireAuth from "./components/form/RequireAuth";
import RedirectIfAuth from "./components/form/RedirectIfAuth";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route element={<RedirectIfAuth />}>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<BooksGridPage />} />
        <Route path="/active" element={<ActiveBooksGridPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/historial" element={<ChatHistorialPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App;
