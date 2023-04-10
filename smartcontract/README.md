# PayPal Hardhat Project

This project demonstrates a basic Hardhat use case. Basic Functionalities:

- Request Money
- Receive Money
- Get Transaction History

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat node
npx hardhat compile
npx hardhat run scripts/deploy.ts
```

```shell
pnpm hardhat run scripts/deploy.ts --network polygon_mumbai
```

### OutPut:

- PayPal Deployed to 0xe7dBB93Fe4749DD5A8C1f1E86F2CeCf22084dB01

```shell
pnpm hardhat verify 0xe7dBB93Fe4749DD5A8C1f1E86F2CeCf22084dB01 --network polygon_mumbai
```

### OutPut:

- Successfully submitted source code for contract PayPal.sol: PayPal at 0xe7dBB93Fe4749DD5A8C1f1E86F2CeCf22084dB01
  for verification on the block explorer.
- Waiting for verification result...

### View Contract on PolygonScan:

- Successfully verified contract PayPal on Polygon Mumbai TestNet.
  https://mumbai.polygonscan.com/address/0xe7dBB93Fe4749DD5A8C1f1E86F2CeCf22084dB01#code
