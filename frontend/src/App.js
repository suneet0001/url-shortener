import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import PasswordPage from "./PasswordPage";

function Main() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const short = params.get("short");

  return (
    <Routes>
      {short ? (
        <Route path="/" element={<PasswordPage />} />
      ) : (
        <Route path="/" element={<Dashboard />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
