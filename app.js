const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const templeteRoutes = require("./routes/templete");
const app = express();



app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(templeteRoutes);


sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Server is connected");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
