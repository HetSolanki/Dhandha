import app from "./server.js";
import { connect } from "./connect.js";

connect("mongodb://localhost:27017/dhandha").then(() => {
  app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
  });
});
