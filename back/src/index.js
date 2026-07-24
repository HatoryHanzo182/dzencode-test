import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { InitializeSocket } from './sockets/socket.js';
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { ConnectDatabase } from "./data/database.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/uploads", express.static("uploads"));

const httpServer = createServer(app);

InitializeSocket(httpServer);
await ConnectDatabase();

httpServer.listen(PORT, () => 
{
    console.log(`Server run on http://localhost:${PORT}`);
});