const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const response = require("./interceptors/response.interceptor");
const { changeLostPassword } = require("./controllers/auth.controller");
const morgan = require("morgan"); // Morgan kütüphanesini ekle

dotenv.config();
app.use(cors());

app.use(morgan("combined")); // 'combined' log formatını kullan, dilersen başka formatlar da mevcut

app.use("/webhook", require("./routes/webhook.route"));

app.use(express.json());
const APP_PORT = process.env.APP_PORT || 3003;

const ACCESS_TOKEN = process.env.MOBILE_TOKEN;

// const authenticateToken = (req, res, next) => {
//   const token = req.header("X-App-Token");

//   if (!token) {
//     return response.badRequest(res, "Token is required", 401);
//   }
//   if (token !== ACCESS_TOKEN) {
//     return response.badRequest(res, "Invalid token", 401);
//   }
//   next();
// };

// Routes
app.get("/", (req, res, next) => {
  response.success(
    res,
    {
      version: process.env.CURRENT_VERSION || "3.0.0",
      name: "SDL Rest API",
      status: "Running",
    },
    "!Sandbox SDL Rest API Working",
    200
  );
});

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
app.use("/sales", require("./routes/sales.route"));

// Admin routes
app.use("/admin/auth", require("./routes/admin/auth.route"));
app.use("/admin/user", require("./routes/admin/user.route"));

// For Invalid Routes
app.use((req, res, next) => {
  response.badRequest(
    res,
    "Route not found, please review documentation.",
    404
  );
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port http://localhost:${APP_PORT}`);
});
