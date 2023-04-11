import express from "express";
import Moralis from "moralis";
import cors from "cors";
import "dotenv/config";
import ABI from "./abi.json";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getNameAndBalance", async (req, res) => {
  const { userAddress } = req.query;

  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: process.env.CHAIN_ID,
    address: process.env.CONTRACT_ADDRESS,
    functionName: "getMyName",
    abi: ABI,
    params: { _user: userAddress },
  });

  const jsonResponseName = response.raw;

  const balanceRes = await Moralis.EvmApi.balance.getNativeBalance({
    chain: process.env.CHAIN_ID,
    address: userAddress as string,
  });

  const jsonResponseBal = (
    (balanceRes.raw.balance as unknown as number) / 1e18
  ).toFixed(2);

  const jsonResponse = {
    name: jsonResponseName,
    balance: jsonResponseBal,
  };

  return res.status(200).json(jsonResponse);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT: ${process.env.PORT} for API Calls.`);
  });
});
