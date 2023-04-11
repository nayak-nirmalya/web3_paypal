import express from "express";
import Moralis from "moralis";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getNameAndBalance", async (req, res) => {
  return res.status(200).json({});
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT: ${process.env.PORT} for API Calls.`);
  });
});
