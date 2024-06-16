import styles from "./coredbg.module.scss";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import SignalingChannel from "../../webrtc/signaling-channel";
const { generateKeyPairSync } = require('crypto');
const crypto = require('crypto');
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';
import { createHelia } from "helia";
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid'
import { identify } from '@libp2p/identify'
import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { MemoryBlockstore } from 'blockstore-core'
import { MemoryDatastore } from 'datastore-core'
//import {circuitRelayTransport, circuitRelayServer} from "@libp2p/circuit-relay";
import { bootstrap } from '@libp2p/bootstrap'
import {webRTC, webRTCDirect} from "@libp2p/webrtc";
import {webTransport} from "@libp2p/webtransport";
import {webSockets} from "@libp2p/websockets";
import {all} from "@libp2p/websockets/filters";

const _gvars = {};
export default function CoreDBG() {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [isMetaMaskLoggedIn, setIsMetaMaskLoggedIn] = useState(false);
    const [coreState, setCoreState] = useState(0);
    const _gvars = {};

    useEffect(() => {
        setIsMetaMaskInstalled(true);
    }, []);

    const checkMetaMaskInstalled = () => {
        if (typeof window.solana !== "undefined") {
            setIsMetaMaskInstalled(true);
        } else {
            setIsMetaMaskInstalled(false);
        }
    };

    const checkMetaMaskLoggedIn = async () => {
        if (isMetaMaskInstalled) {
            try {
                const accounts = await window.solana.connect();
                if (accounts.length > 0) {
                    _gvars.wallet = accounts[0].publicKey.toBase58();
                    setIsMetaMaskLoggedIn(true);
                } else {
                    setIsMetaMaskLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking MetaMask login:", error);
            }
        }
    };

    const handleLogin = async () => {
        if (isMetaMaskInstalled) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                if (accounts.length > 0) {
                    setOurId(accounts[0]);
                    setIsMetaMaskLoggedIn(true);
                }
            } catch (error) {
                console.error("Error logging in with MetaMask:", error);
            }
        }
    };

    function getYouClass() {
        switch (coreState) {
            case 0:
                return "";
            case 1:
                return styles.core_you_awaiting_recv;
            case 2:
                return styles.core_you_recv;
            case 4:
                return styles.core_you_left;
            case 5:
                return styles.core_you_left;
        }
    }
    function getPartnerClass() {
        switch (coreState) {
            case 0:
                return "";
            case 1:
                return [styles.core_partner_flicker, styles.core_partner_visible, styles.core_partner_sending].join(' ');
            case 2:
                return [styles.core_partner_sending, styles.core_partner_visible].join(' ');
            case 4:
                return [styles.core_partner_flicker, styles.core_partner_visible, styles.core_partner_receiving].join(' ');
            case 5:
                return [styles.core_partner_visible, styles.core_partner_receiving].join(' ');

        }
    }
    return (
        <div className={styles.core_root}>
            <div className={[styles.core_you, getYouClass()].join(' ')}>
                {isMetaMaskInstalled && !isMetaMaskLoggedIn && (
                    <button onClick={async () => {

                        // application-specific data lives in the datastore
                        const datastore = new MemoryDatastore()
                        const libp2p = await createLibp2p({
                            datastore,
                            addresses: {
                                listen: [
                                    "/webrtc", "/wss", "/ws",
                                ]
                            },
                            transports: [
                                webSockets({filter: all}),
                                webRTC(), webRTCDirect(),
                                webTransport(),
                                // https://github.com/libp2p/js-libp2p-websockets#libp2p-usage-example
                                circuitRelayTransport({discoverRelays: 3}),
                            ],
                            connectionEncryption: [
                                noise()
                            ],
                            streamMuxers: [
                                yamux()
                            ],
                            peerDiscovery: [
                                bootstrap({
                                    list: [
                                        // a list of bootstrap peer multiaddrs to connect to on node startup
                                        '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
                                        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                                        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa'
                                    ]
                                })
                            ],
                            services: {
                                identify: identify()
                            }
                        })

                        libp2p.addEventListener('peer:discovery', (evt) => {
                            console.log('found peer: ', evt.detail.toString())
                        })
                        // the blockstore is where we store the blocks that make up files
                        const blockstore = new MemoryBlockstore()
                        const heliaInstance = await createHelia({ blockstore, datastore, libp2p });
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        const muladr = await heliaInstance.libp2p.getMultiaddrs();
                        console.log(muladr);
                    }}>
                        Host shit on ipfs
                    </button>
                )}
                <input type="text" onChange={(e) => {
                    const inputValue = e.target.value;
                    _gvars.muladdr = inputValue;
                    // Do something with the input value
                }} />
                <input type="text" onChange={(e) => {
                    const inputValue = e.target.value;
                    _gvars.hashbrown = inputValue;
                    // Do something with the input value
                }} />
                {isMetaMaskInstalled && !isMetaMaskLoggedIn && (
                    <button onClick={async () => {
                        const heliaInstance = await createHelia();
                        console.log(heliaInstance);
                        const fs = await unixfs(heliaInstance);
                        console.log("Grabbing");
                        for await (const buf of fs.cat(CID.parse(_gvars.hashbrown))) {
                            console.log("Buf is:");
                            console.info(buf)
                        }
                    }}>
                        Get shit from ipfs
                    </button>
                )}

            </div>
        </div>
    );
}