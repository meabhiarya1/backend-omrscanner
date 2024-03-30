const express = require("express");

const app = express();

app.use((req, res) => {
    res.status(200).json("hi Abhisek")
});

app.listen(4000, () => {
  console.log("Server is connected");
});
