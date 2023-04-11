import express from "express";
import Moralis from "moralis";
import cors from "cors";
import "dotenv/config";
import ABI from "./abi.json";

const app = express();

app.use(cors());
app.use(express.json());

function convertArrayToObjects(arr: []) {
  if (arr.length === 0)
    return [
      {
        key: "",
        type: "",
        amount: "",
        message: "",
        address: "",
        subject: "",
      },
    ];

  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: transaction[1],
    message: transaction[2],
    address: `${(transaction[3] as string).slice(0, 4)}...${(
      transaction[3] as string
    ).slice(38)}`,
    subject: transaction[4],
  }));

  return dataArray.reverse();
}

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

  const tokenRes = await Moralis.EvmApi.token.getTokenPrice({
    address: process.env.TOKEN_ADDRESS,
  });

  const jsonResponseDollar = (
    tokenRes.raw.usdPrice * Number(jsonResponseBal)
  ).toFixed(2);

  const historyRes = await Moralis.EvmApi.utils.runContractFunction({
    chain: process.env.CHAIN_ID,
    address: process.env.CONTRACT_ADDRESS,
    functionName: "getMyHistory",
    abi: ABI,
    params: { _user: userAddress },
  });

  const jsonResponseHistory = convertArrayToObjects(
    historyRes.raw as unknown as []
  );

  const reqRes = await Moralis.EvmApi.utils.runContractFunction({
    chain: process.env.CHAIN_ID,
    address: process.env.CONTRACT_ADDRESS,
    functionName: "getMyRequests",
    abi: ABI,
    params: { _user: userAddress },
  });

  const jsonResponseRequests = reqRes.raw;

  const jsonResponse = {
    name: jsonResponseName,
    balance: jsonResponseBal,
    dollars: jsonResponseDollar,
    history: jsonResponseHistory,
    requests: jsonResponseRequests,
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
