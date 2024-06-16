import Head from "next/head";
import TitleCard from "components/TitleCard/titleCard.js";
import Layout from "components/layout.js";
import Core from "components/core/core.js";
import CoreDBG from 'components/coredbg/coredbg.js';
import LinkCard from "components/LinkCard/linkCard.js";
import { flags } from "socket.io/lib/namespace";
import WalletConnectionButton from "components/walletConnBtn/WalletConnectionButton";
import SelectNetworkThing from "components/SelectNetworkThing/SelectNetworkThing";
import React, { useState } from "react";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false
    };
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>zk-Lokomotive</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <main>
          <div className="header">
            <SelectNetworkThing />
            <TitleCard
              title="zk-Lokomotive"
              text="Cross chain file transfer, powered by"
            />
            <div className="wallet-button-container">
              <WalletConnectionButton
                onclick={() => {
                  this.setState({ refresh: !this.state.refresh });
                }}
              />
              <a
                href="https://github.com/virjilakrum/zk-lokomotive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Github zk-Lokomotive</button>
              </a>
            </div>
          </div>
          <div
            className="fifty-grid center col-mobile  d-flex flex-wrap justify-center"
            style={{
              color: "#FEFFAF",
              display: "block",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }}
          >
            <Core />
          </div>
        </main>
      </Layout>
    );
  }
}

export default Home;
/*
export default function Home() {
  const [refresh, setRefresh] = useState(false);
  return (
    <Layout>
      <Head>
        <title>zk-Lokomotive</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <div className="header">
          <SelectNetworkThing />
          <TitleCard
            title="zk-Lokomotive"
            text="Cross chain file transfer, powered by Wormhole"
          />
          <div
            className="wallet-button-container"
            
          >
          <WalletConnectionButton onclick={() => {
            setRefresh(!refresh);
            forceUpdate();
          }}/>
          <a
          href="https://github.com/virjilakrum/zk-lokomotive"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Github zk-Lokomotive</button>
        </a>
          </div>
        </div>
        <div
          className="fifty-grid center col-mobile  d-flex flex-wrap justify-center"
          style={{ color: "#3cd36c", display: "block", justifyContent: "center", width: "100%", height: "100%", overflow: "hidden"}}
        >
          <Core />
        </div>
      </main>
    </Layout>
  );
}
*/