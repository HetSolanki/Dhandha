import express from "express";
import user_api from "./API/user_route.js";
import customer_api from "./API/customer_route.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});

app.use("/api/auth", user_api);
app.use("/api/customers", customer_api );

export default app;
