import express from "express";
import trendingRoutes from "./src/routes/trending.routes";

const app = express();
const PORT = process.env.PORT || 3001;

// Parse allowed origins from environment variable
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(express.json());

// Enable CORS for the Next.js frontend
app.use((req, res, next) => {
  const origin = req.headers.origin || "";

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

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

// Export for Vercel
export default app;

// Local development server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}
