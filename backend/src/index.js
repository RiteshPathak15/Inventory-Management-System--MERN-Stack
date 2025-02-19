import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ||"http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Fallback route for React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
