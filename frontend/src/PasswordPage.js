import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API;

function PasswordPage() {
  const { short } = useParams();
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post(
        `${API}/api/verify/${short}`,
        { password }
      );

      window.location.href = res.data.redirect;
    } catch {
      alert("Wrong password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter Password</h2>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default PasswordPage;
