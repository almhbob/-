import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import { ridesRouter } from "./routes/rides.js";
import { pricingRouter } from "./routes/pricing.js";
import { driversRouter } from "./routes/drivers.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, app: "JUMBAK", region: "Rufa'a, Sudan" });
});

app.use("/api/rides", ridesRouter(io));
app.use("/api/pricing", pricingRouter);
app.use("/api/drivers", driversRouter);

io.on("connection", (socket) => {
  socket.on("driver:online", (payload) => {
    socket.broadcast.emit("driver:location", payload);
  });

  socket.on("ride:update", (payload) => {
    io.emit(`ride:${payload.rideId}`, payload);
  });
});

const port = Number(process.env.PORT || 4000);
httpServer.listen(port, () => {
  console.log(`JUMBAK server running on port ${port}`);
});
