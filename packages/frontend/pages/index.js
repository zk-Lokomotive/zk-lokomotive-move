import Head from "next/head";
import Layout from "components/layout.js";
import { useState, useEffect } from "react";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { MovementClient } from "@movementlabs/movement-sdk";
import { ethers } from "ethers";
import ArweaveUploader from '../components/ArweaveUploader';
import WormholeTransfer from '../components/WormholeTransfer';

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [evmAddress, setEvmAddress] = useState("");
    const { account, connect, disconnect } = useWallet();
    const [movementClient, setMovementClient] = useState(null);

    useEffect(() => {
        const initializeMovementClient = async () => {
            const client = new MovementClient();
            await client.initialize();
            setMovementClient(client);
        };

        initializeMovementClient();
    }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setEvmAddress(address);
                setIsConnected(true);
            } catch (error) {
                console.error("Cüzdan bağlantı hatası:", error);
            }
        } else {
            console.error("MetaMask yüklü değil!");
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setEvmAddress("");
    };

    return (
        <Layout>
            <Head>
                <title>zk-Lokomotive</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main>
                <h1>zk-Lokomotive: Cross-Chain Dosya Transferi</h1>
                {!isConnected ? (
                    <button onClick={connectWallet}>EVM Cüzdanı Bağla</button>
                ) : (
                    <div>
                        <p>Bağlı EVM Adresi: {evmAddress}</p>
                        <button onClick={disconnectWallet}>Cüzdanı Ayır</button>
                        <ArweaveUploader evmAddress={evmAddress} movementClient={movementClient} />
                        <WormholeTransfer evmAddress={evmAddress} movementClient={movementClient} />
                    </div>
                )}
            </main>
        </Layout>
    );
}