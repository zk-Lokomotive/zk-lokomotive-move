import React, { useState } from "react";
import styles from "./WalletConnectionButton.module.scss";
import Avatar, { genConfig } from 'react-nice-avatar'
import _gvars from "../../globals";
import { useWallet, ConnectModal } from '@suiet/wallet-kit';
import {
    ConnectButton,
    WalletProvider,
} from '@suiet/wallet-kit';
import { connect } from "net";

const WalletConnectionButton = (
    {onclick}
) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [avatarConfig, setAvatarConfig] = useState({});
    const {select, account,detectedWallets, configuredWallets, connected} = useWallet();
    const [showModal, setShowModal] = useState(false)
    const handleConnectionSui = async () => {
        console.log("sus");
        if (isConnected) {
            setIsConnected(false);
            setWalletAddress("");
            _gvars._gvars.isConnected = false;
            _gvars._gvars.walletAddress = "";
            return;
        }
        if (_gvars._gvars.selectedNetwork === "Sui") {
            console.log(detectedWallets);
            console.log(configuredWallets)
            await select(configuredWallets[0].name);
            console.log(connected);
            setIsConnected(true);
            var addr = account?.address;
            setAvatarConfig(genConfig(addr));
            setWalletAddress(addr);
            _gvars._gvars.isConnected = true;
            _gvars._gvars.walletAddress = addr;
            if(onclick) onclick();
        } else {
            return;
        }
    };
    const handleConnectionAVAX = async () => {
        if (isConnected) {
            setIsConnected(false);
            setWalletAddress("");
            _gvars._gvars.isConnected = false;
            _gvars._gvars.walletAddress = "";
            return;
        }
        if (_gvars._gvars.selectedNetwork === "Avax") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                if (accounts.length > 0) {
                    console.log(accounts);
                    setIsConnected(true);
                    setWalletAddress(accounts[0]);
                    setAvatarConfig(genConfig(accounts[0]));
                    _gvars._gvars.isConnected = true;
                    _gvars._gvars.walletAddress = accounts[0];
                    if(onclick) onclick();
                    
                } else {
                    setIsConnected(false);
                    _gvars._gvars.isConnected = false;
                }
            } catch (error) {
                console.error("Error checking MetaMask login:", error);
            }
        } else {
            return; //shit no
        }
    };

    const { copied, setCopied } = useState(false);
    const className = `${isConnected ? "walletbtnConnectConnected" : "walletbtnConnect"}`;
    return (

        <div className={styles[className]}>
            
                <button
                    className={styles.walletConnectionButton}
                    onClick={async ()=> {
                        if(_gvars._gvars.selectedNetwork === "Sui")
                        {
                            await handleConnectionSui();
                        }   
                        else handleConnectionAVAX();
                    }}
                >
                    {isConnected ? "Connected" : "Connect"}
                </button>

    
            {isConnected && (
                <div className={styles.PopupMenuConnected}>
                    <div className={styles.WalletDetails}>
                        <Avatar style={{ width: '50px', height: '50px' }} {...avatarConfig} />
                        <p onClick={() => {
                            navigator.clipboard.writeText(walletAddress);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 3000);
                        }}>
                            {copied ? "Copied!" : `${walletAddress.slice(0, 5)}..${walletAddress.slice(-4)}`}
                        </p>
                    </div>
                    <button onClick={handleConnectionAVAX}>Disconnect</button>
                </div>
            )}
        </div>
    );
};

export default WalletConnectionButton;

/*
class WalletConnectionButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            walletAddress: "",
            avatarConfig: {}
        };
    }

    handleConnection = async () => {
        if (this.state.isConnected) {
            this.setState({
                isConnected: false,
                walletAddress: ""
            });
            _gvars._gvars.isConnected = false;
            _gvars._gvars.walletAddress = "";
            return;
        }
        if(_gvars._gvars.selectedNetwork === "Avax") {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length > 0) {
                console.log(accounts);
                this.setState({
                    isConnected: true,
                    walletAddress: accounts[0],
                    avatarConfig: genConfig(accounts[0])
                });
                _gvars._gvars.isConnected = true;
                _gvars._gvars.walletAddress = accounts[0];
            } else {
                this.setState({
                    isConnected: false
                });
                _gvars._gvars.isConnected = false;
            }
        } catch (error) {
            console.error("Error checking MetaMask login:", error);
        }
    } else {
        connect();
        this.setState({
            isConnected: true,
            walletAddress: account.address,
            avatarConfig: genConfig(account)
        });
        _gvars._gvars.isConnected = true;
        _gvars._gvars.walletAddress = account;
    }
    };

    render() {
        const { isConnected, walletAddress, avatarConfig } = this.state;
        const { copied } = this.state;
        console.log(styles);
        const className = `${isConnected ? "walletbtnConnectConnected" : "walletbtnConnect"}`
        return (
            <div className={styles[className]}>
            <button
                className={styles.walletConnectionButton}
                onClick={this.handleConnection}
            >
                {isConnected ? "Connected" : "Connect"}
            </button>
            {isConnected && (
                <div className={styles.PopupMenuConnected}>
                <div className={styles.WalletDetails}>
                    <Avatar style={{ width: '50px', height: '50px' }} {...avatarConfig} />
                    <p onClick={
                    () => {
                        navigator.clipboard.writeText(walletAddress)
                        this.setState({ copied: true })
                        setTimeout(() => this.setState({ copied: false }), 3000)
                    }
                    }>
                    {copied ? "Copied!" : `${walletAddress.slice(0,5)}..${walletAddress.slice(-4)}`}
                    </p>
                </div>
                <button onClick={this.handleConnection}>Disconnect</button>
                </div>
            )}
            </div>
        );
    }
}

export default WalletConnectionButton;
*/