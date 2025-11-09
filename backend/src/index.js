import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

connectDB();

// API routes
app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/orders", orderRoutes);
// removed duplicate: app.use("/api", userRoutes);

// Serve react build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
