const express = require("express");
const app = express();
const sequelize = require("./config/database");

app.use(express.json());

// Routes
app.use("/users", require("./routes/user.route"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
