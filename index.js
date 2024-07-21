const express = require("express");
const connectTomongo = require("./db");
var cors = require("cors");

connectTomongo();
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.use("/api/auth/", require("./Routes/auth"));
app.use("/api/diary/", require("./Routes/diary"));

app.listen(port, () => {
  console.log(
    `DearDiary backend app listening on port http://localhost:${port}`
  );
});
