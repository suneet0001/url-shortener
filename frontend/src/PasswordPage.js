import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PasswordPage() {
  const { short } = useParams();
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/verify/${short}`,
        { password }
      );

      window.location.href = res.data.redirect;
    } catch {
      alert("Wrong password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #b43ccf, #5b5be1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* GLASS CARD */}
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
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
          className="form-control mb-3"
          style={{
            borderRadius: "10px",
            border: "none",
            padding: "10px",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn w-100"
          style={{
            background: "linear-gradient(135deg, #22c55e, #4ade80)",
            border: "none",
            fontWeight: "600",
            color: "#000",
            borderRadius: "10px",
            transition: "0.3s",
            boxShadow: "0 5px 15px rgba(34,197,94,0.4)",
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