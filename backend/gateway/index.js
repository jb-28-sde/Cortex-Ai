import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeaders.js";
import morgan from "morgan";

const port = process.env.PORT || 10000;

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", protect,proxyWithHeader(process.env.CHAT_SERVICE));
app.use("/api/agent", protect,proxyWithHeader(process.env.AGENT_SERVICE ));
app.use("/api/billing", protect,proxyWithHeader(process.env.BILLING_SERVICE));
app.get("/api/me", protect, getCurrentUser);

app.get("/", (req, res) => {
  res.json({ message: "hello from gateway V5" });
});

// app.listen(port, () => {
//   console.log(`gateway started at ${port}`);
// });
app.listen(port, "0.0.0.0", () => {
  console.log(`gateway started at ${port}`);
});
