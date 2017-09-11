const express = require("express");
const app = express();
const pricesJSON = require("./prices.json");

app.get("/api/prices", async (req, res) => {
  res.send(pricesJSON);
});

app.listen(3001, () => {
  console.log("Server is now listening...");
});
