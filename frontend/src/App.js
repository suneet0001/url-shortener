import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PasswordPage from "./PasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/password/:short" element={<PasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;