const express = require("express");
const app = express();
const dotenv = require("dotenv");
const response = require("./interceptors/response.interceptor");
dotenv.config();

app.use(express.json());
const APP_PORT = process.env.APP_PORT || 3001;

// Routes
app.use("/users", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));

// For Invalid Routes
app.use((req, res, next) => {
  response.badRequest(res, "Route not found, please review documentation.", 404);
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
