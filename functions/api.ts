import express, { Router } from "express";
import serverless from "serverless-http";

const app = express();
const router = Router();

router.get("/games", (req, res) => {
  const games = [
    {
      id: 1,
      name: "Green Snake",
      gameUrl: "https://snakecardris.netlify.app/",
      imageUrl: "https://snakecardris.netlify.app/index.png",
    },
  ];

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Credentials", "true");

  try {
    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/api/", router);
export const handler = serverless(app);
