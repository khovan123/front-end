import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
const app = express();
// const cors = require("cors");
const corsOptions = { origin: "http://localhost:5173" };
// parse json body request
app.use(bodyParser.json());

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "X-Requested-With,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "X-Requested-With");
  next();
});

app.get("/api/images", async (req, res) => {
  const fileContent = await fs.readFile("./data/images.json");
  const images = JSON.parse(fileContent);
  res.status(200).json(images);
});

app.put("/api/add", async (req, res) => {
  const newImage = req.body;
  // console.log(newImage);
  let images = JSON.parse(await fs.readFile("./data/images.json"));
  images.push(newImage);
  await fs.writeFile("./data/images.json", JSON.stringify(images));
  res.status(200).json({ message: "Updated!" });
});

app.patch("/api/delete", async (req, res) => {
  const newImage = req.body;
  // console.log(newImage);
  const id = newImage.id;
  const images = JSON.parse(await fs.readFile("./data/images.json"));

  // const updateImages = [];
  const updateImages = images.filter((image) => image.id !== id);

  await fs.writeFile("./data/images.json", JSON.stringify(updateImages));
  res.status(200).json({ message: "Delete sucessfull!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 not found" });
});
app.options("*", function (req, res) {
  res.header("Access-Control-Allow-Methods", "X-Requested-With");
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
