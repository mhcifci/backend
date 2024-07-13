const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const response = require("./interceptors/response.interceptor");
dotenv.config();
app.use(cors());

app.use("/webhook", require("./routes/webhook.route"));

app.use(express.json());
const APP_PORT = process.env.APP_PORT || 3003;

const ACCESS_TOKEN = process.env.MOBILE_TOKEN;

const authenticateToken = (req, res, next) => {
  const token = req.header('X-App-Token');
  if (!token) {
    return response.badRequest(res, "Token is required", 401);
  }
  if (token !== ACCESS_TOKEN) {
    return response.badRequest(res, "Invalid token", 403);
  }
  next();
};



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


app.use("/users", authenticateToken, require("./routes/user.route"));
app.use("/auth", authenticateToken, require("./routes/auth.route"));
app.use("/token", authenticateToken, require("./routes/token.route"));
app.use("/listing", authenticateToken, require("./routes/listing.route"));
app.use("/design", authenticateToken, require("./routes/design.route"));
app.use("/upload", authenticateToken, require("./routes/upload.route"));
app.use("/profile", authenticateToken, require("./routes/profile.route"));
app.use("/transactions", authenticateToken, require("./routes/transactions.route"));
app.use("/jobs", authenticateToken, require("./routes/jobs.route"));
app.use("/packages", authenticateToken, require("./routes/packages.route"));
app.use("/orders", authenticateToken, require("./routes/orders.route"));
app.use("/postcodes", authenticateToken, require("./routes/postcodes.route"));
app.use("/reports", authenticateToken, require("./routes/reports.route"));

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
