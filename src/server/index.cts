import { Request, Response } from "express";
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const games = [
  {
    id: 1,
    name: "Green Snake",
    gameUrl: "http://127.0.0.1:5500",
    imageUrl: "https://snakecardris.netlify.app/index.png",
  },
  {
    id: 2,
    name: "Blue Snake",
    gameUrl: "https://snakecardris.netlify.app/",
    imageUrl: "https://snakecardris.netlify.app/index.png",
  },
];

app.get("/v1/games", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).json({ games });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
