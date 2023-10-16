const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// Routes
app.use("/users", require("./routes/user.route"));

const APP_PORT = process.env.APP_PORT || 3001;

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
