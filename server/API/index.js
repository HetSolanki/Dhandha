import app from "./server.js";
import { connect } from "./connect.js";
import * as env from "dotenv";

env.config();

const port = process.env.PORT || 4000;

connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
    console.log(`http://localhost:${port}`);
  });
});   
