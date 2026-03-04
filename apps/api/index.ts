import express from "express";
import trendingRoutes from "./src/routes/trending.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Enable CORS for the Next.js frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "TrendLens API" });
});

app.use("/api/trending", trendingRoutes);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
