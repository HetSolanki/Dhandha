import express from "express";
import user_api from "./API/user_route.js";
import customer_api from "./API/customer_route.js";
import customerentry_api from "./API/customerEntry_route.js";
import shop_api from "./API/shop_route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});

app.use("/api/auth", user_api);
app.use("/api/customers", customer_api);
app.use("/api/customerentry", customerentry_api);
app.use("/api/shop", shop_api);

export default app;
