import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API;

function PasswordPage() {
  const short = new URLSearchParams(window.location.search).get("short");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post(`${API}/api/verify/${short}`, {
        password,
      });

      window.location.href = res.data.redirect;
    } catch {
      alert("Wrong password ❌");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* CARD */}
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          padding: "40px",
          borderRadius: "20px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>🔐 Protected Link</h2>

        <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
          Enter password to continue
        </p>

        <input
          type="password"
          placeholder="Enter password"
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #22c55e, #4ade80)",
            color: "#000",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          onClick={submit}
        >
          Unlock 🔓
        </button>
      </div>
    </div>
  );
}

export default PasswordPage;
