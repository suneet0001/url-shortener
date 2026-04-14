const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MUST use env variable (no fallback in production)
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const routes = require("./routes/urlRoutes");

app.use("/api", routes);   // API routes
app.use("/", routes);      // short URLs (/yt)

// Health route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
