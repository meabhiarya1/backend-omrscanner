const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const templeteRoutes = require("./routes/templete");
const Templete = require("./models/TempleteModel/templete");
const MetaData = require("./models/TempleteModel/metadata");
const Files = require("./models/TempleteModel/files");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/view/:path", async (req, res, next) => {
  const { path: imagePath } = req.params;
  const sourceFilePath = path.join(__dirname, "extractedFiles", imagePath);
  res.sendFile(sourceFilePath);
});

app.use("/static", express.static(path.join(__dirname, "/extractedFiles")));

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(templeteRoutes);

Templete.hasMany(MetaData);
MetaData.belongsTo(Templete);
Templete.hasMany(Files);
Files.belongsTo(Templete);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Server is connected");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
