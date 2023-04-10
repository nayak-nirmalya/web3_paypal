import { ethers } from "hardhat";
import { PayPal, PayPal__factory } from "../typechain-types";

const tokens = (no: string) => ethers.utils.parseUnits(no.toString(), "ether");

async function main() {
  // get signers
  const [owner, myAccount] = await ethers.getSigners();

  // deploy contract
  const PayPal = (await ethers.getContractFactory("PayPal")) as PayPal__factory;
  const payPal: PayPal = await PayPal.deploy();

  await payPal.deployed();

  console.log(`PayPal Deployed to ${payPal.address}`);

  const myHistory = await payPal.connect(owner).getMyHistory(myAccount.address);

  console.log(`My Transaction History: ${myHistory}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
