import { useEffect, useState } from "react";
import payPal from "./assets/PayPal.svg";
import "./App.css";

import { Layout, Button } from "antd";
import CurrentBalance from "./components/CurrentBalance";
import RequestAndPay, { Request } from "./components/RequestAndPay";
import AccountDetails from "./components/AccountDetails";
import RecentActivity, { History } from "./components/RecentActivity";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";

const { Header, Content } = Layout;

function App() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const [name, setName] = useState("...");
  const [balance, setBalance] = useState("...");
  const [dollars, setDollars] = useState("...");
  const [history, setHistory] = useState<History[]>();
  const [requests, setRequests] = useState<Request>();

  function disconnectAndSetNull() {
    disconnect();
    setName("...");
    setBalance("...");
    setDollars("...");
    setHistory([]);
    setRequests({
      "0": [""],
      "1": [""],
      "2": [""],
      "3": [""],
    });
  }

  async function getNameAndBalance() {
    const res = await axios.get(`http://localhost:3001/getNameAndBalance`, {
      params: { userAddress: address },
    });

    const response = res.data;

    if (response.name[1]) {
      setName(response.name[0]);
    }
    setBalance(String(response.balance));
    setDollars(String(response.dollars));
    setHistory(response.history);
    setRequests(response.requests);
  }

  useEffect(() => {
    if (!isConnected) return;
    getNameAndBalance();
  }, [isConnected]);

  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="headerLeft">
            <img src={payPal} alt="logo" className="logo" />
            {isConnected && (
              <>
                <div
                  className="menuOption"
                  style={{ borderBottom: "1.5px solid black" }}
                >
                  Summary
                </div>
                <div className="menuOption">Activity</div>
                <div className="menuOption">{`Send & Request`}</div>
                <div className="menuOption">Wallet</div>
                <div className="menuOption">Help</div>
              </>
            )}
          </div>
          {isConnected ? (
            <Button type={"primary"} onClick={disconnectAndSetNull}>
              Disconnect Wallet
            </Button>
          ) : (
            <Button
              type={"primary"}
              onClick={() => {
                connect();
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Header>
        <Content className="content">
          {isConnected ? (
            <>
              <div className="firstColumn">
                <CurrentBalance dollars={dollars} />
                {requests && (
                  <RequestAndPay
                    requests={requests}
                    getNameAndBalance={getNameAndBalance}
                  />
                )}
                <AccountDetails
                  address={address!}
                  name={name}
                  balance={balance}
                />
              </div>
              <div className="secondColumn">
                {history && <RecentActivity history={history} />}
              </div>
            </>
          ) : (
            <div>Please Log In to Interact.</div>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
