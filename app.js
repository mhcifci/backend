const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const response = require("./interceptors/response.interceptor");
dotenv.config();
app.use(cors());

app.use("/webhook", require("./routes/webhook.route"));

app.use(express.json());
const APP_PORT = process.env.APP_PORT || 3001;

// Routes
app.get("/", (req, res, next) => {
  response.success(
    res,
    {
      version: process.env.CURRENT_VERSION || "1.0.0",
      name: "SDL Rest API",
      status: "Running",
    },
    "!Sandbox SDL Rest API Working",
    200
  );
});

// ! TODO buraya middleware eklenecek basit token için app middleware

app.use("/users", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/token", require("./routes/token.route"));
app.use("/listing", require("./routes/listing.route"));
app.use("/design", require("./routes/design.route"));
app.use("/upload", require("./routes/upload.route"));
app.use("/profile", require("./routes/profile.route"));
app.use("/transactions", require("./routes/transactions.route"));
app.use("/jobs", require("./routes/jobs.route"));
app.use("/packages", require("./routes/packages.route"));
app.use("/orders", require("./routes/orders.route"));
app.use("/postcodes", require("./routes/postcodes.route"));
app.use("/reports", require("./routes/reports.route"));

// Admin routes
app.use("/admin/auth", require("./routes/admin/auth.route"));
app.use("/admin/user", require("./routes/admin/user.route"));

// For Invalid Routes
app.use((req, res, next) => {
  response.badRequest(res, "Route not found, please review documentation.", 404);
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
