import app from "./server.js";
import { connect } from "./connect.js";
import * as env from "dotenv";

env.config();

connect("mongodb://localhost:27017/dhandha").then(() => {
  app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
  });
});
