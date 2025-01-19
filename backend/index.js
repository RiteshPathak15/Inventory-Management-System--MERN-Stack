import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import inventoryRoutes from "./src/routes/inventory.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import supplierRoutes from "./src/routes/supplier.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import reportRoutes from "./src/routes/report.routes.js";
import sellRoutes from "./src/routes/sell.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
