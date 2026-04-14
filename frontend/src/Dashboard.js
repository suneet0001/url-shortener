import { useState, useEffect } from "react";
import axios from "axios";
import { FaCopy, FaTrash } from "react-icons/fa";

const API = process.env.REACT_APP_API;

function Dashboard() {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("");
  const [short, setShort] = useState("");
  const [urls, setUrls] = useState([]);

  const fetchAnalytics = async () => {
    const res = await axios.get(`${API}/api/analytics`);
    setUrls(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/api/shorten`, {
        url,
        custom,
        password,
        expiry,
      });

      setShort(`${API}/${res.data.short}`);
      fetchAnalytics();
    } catch {
      alert("Error creating URL");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #8b5cf6, #764ba2)",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: "rgba(255, 255, 255, 0.26)",
          padding: "20px",
        }}
      >
        <div className="container">

          {/* HEADER */}
          <h1
            className="text-center mb-5"
            style={{
              fontWeight: "700",
              fontSize: "2.3rem",
              color: "#1e293b",
            }}
          >
            🔗 Smart URL Shortener
          </h1>

          {/* CREATE URL */}
          <div
            className="p-4 mb-5"
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <h4>Create Short URL</h4>

            <input
              className="form-control mb-2"
              placeholder="Enter URL"
              onChange={(e) => setUrl(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Custom alias"
              onChange={(e) => setCustom(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="date"
              className="form-control mb-3"
              onChange={(e) => setExpiry(e.target.value)}
            />

            <button
              className="btn w-100"
              style={{
                background: "#6366f1",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={handleSubmit}
            >
              🚀 Shorten URL
            </button>

            {short && (
              <div className="mt-3">
                <b>Short URL:</b><br />
                <a href={short} target="_blank" rel="noreferrer">
                  {short}
                </a>
              </div>
            )}
          </div>

          {/* ANALYTICS */}
          <div
            className="p-4"
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <h4>📊 Analytics</h4>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Original</th>
                  <th>Short</th>
                  <th>Clicks</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {urls.map((u) => (
                  <tr key={u._id}>
                    <td>{u.original}</td>

                    <td>
                      <a
                        href={`${API}/${u.short}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {u.short}
                      </a>
                    </td>

                    <td>
                      <span
                        style={{
                          background: "#10b981",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: "999px",
                        }}
                      >
                        {u.clicks}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-sm me-2"
                        style={{ background: "#6366f1", color: "white" }}
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${API}/${u.short}`
                          )
                        }
                      >
                        <FaCopy />
                      </button>

                      <button
                        className="btn btn-sm"
                        style={{ background: "#ef4444", color: "white" }}
                        onClick={async () => {
                          if (window.confirm("Delete this URL?")) {
                            await axios.delete(
                              `${API}/api/delete/${u._id}`
                            );
                            fetchAnalytics();
                          }
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
