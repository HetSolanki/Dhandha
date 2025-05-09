import express from "express";
import user_api from "./routes/user_route.js";
import customer_api from "./routes/customer_route.js";
import customerentry_api from "./routes/customerEntry_route.js";
import shop_api from "./routes/shop_route.js";
import payment_link_api from "./routes/payment_link_route.js";
import paymentdetails_api from "./routes/paymentdetails_route.js";
import otpRoutes from "./routes/otpRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});

app.use("/api/auth", user_api);
app.use("/api/customers", customer_api);
app.use("/api/customerentry", customerentry_api);
app.use("/api/shop", shop_api);
app.use("/api/paymentlink", payment_link_api);
app.use("/api/paymentdetails", paymentdetails_api);
app.use("/api/otp", otpRoutes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});

export default app;
