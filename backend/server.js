import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

if (!process.env.JWT_SECRET?.trim()) {
  throw new Error("JWT_SECRET is not configured. Set it in backend/.env or the environment.");
}

import express from "express";
import http from "http";
import { isIP } from "node:net";
import os from "os";
import cors from "cors";
import compression from "compression";
import { ExpressPeerServer } from "peer";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Connect to the database
await connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(compression());
const allowedOrigins = new Set(
  [process.env.FRONTEND_URL, "http://localhost:3000", "https://localhost:3000"]
    .filter(Boolean)
    .map((origin) => new URL(origin).origin)
);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    try {
      const url = new URL(origin);
      const octets = url.hostname.split(".").map(Number);
      const [first, second] = octets;
      const isPrivateIpv4 = isIP(url.hostname) === 4 && (
        first === 10 ||
        (first === 172 && second >= 16 && second <= 31) ||
        (first === 192 && second === 168) ||
        first === 127
      );

      if (["http:", "https:"].includes(url.protocol) && url.port === "3000" && isPrivateIpv4) {
        return callback(null, true);
      }
    } catch (error) {
      return callback(error);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/users/exam", examRoutes);
app.use("/api/chat", chatRoutes);

// Health-check / test route
app.get("/", (req, res) => {
  res.send("Server running successfully");
});

// Local IP route (for QR code generation so phones can connect)
app.get("/api/config/ip", (req, res) => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return res.json({ ip: iface.address });
      }
    }
  }
  res.json({ ip: "localhost" });
});

// ── Server & PeerJS Initialization ───────────────────────────────────────────
const port = process.env.PORT || 5001;

// Create HTTP server to share between Express and PeerJS
const server = http.createServer(app);

const peerServer = ExpressPeerServer(server, {
  debug: false,
  path: "/",
});

// Register the PeerJS middleware
app.use("/peerjs", peerServer);

// ── Global Error Handling ───────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// Start the integrated server
server.listen(port, "0.0.0.0", () => {
  console.log(`Integrated Server running on http://localhost:${port}`);
});

// Robust timeouts
server.keepAliveTimeout = 65000;
server.headersTimeout  = 66000;
// trigger restart
 
 
