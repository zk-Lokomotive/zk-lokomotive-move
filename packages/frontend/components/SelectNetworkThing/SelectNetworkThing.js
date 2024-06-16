import React, { Component } from "react";
import styles from "./SelectNetworkThing.module.scss";
import _gvars from "../../globals";


const tokenMap = new Map();
tokenMap.set("Avax", "/images/avax.svg");
tokenMap.set("Sui", "/images/sui.svg");


class SelectNetworkThing extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedNetwork: "Avax",
            menuToggled: false
        };
        _gvars._gvars.selectedNetwork = "Avax";
    }

    setNetwork = async (index) => {
        console.log(index);
        if (index === 1) {
            this.setState({
                selectedNetwork: "Sui"
            });
            _gvars._gvars.selectedNetwork = "Sui";
        } else {
            this.setState({
                selectedNetwork: "Avax"
            });
            _gvars._gvars.selectedNetwork = "Avax";
        }
        this.setState({ menuToggled: false });
        _gvars._gvars.selectedNetwork = this.state.selectedNetwork;
    };

    render() {
        const { selectedNetwork } = this.state;
        console.log(tokenMap.get(selectedNetwork));

        return (
            <div className={styles.selectNetworkContainer}>
                <img
                    src={tokenMap.get(selectedNetwork)}
                    className={styles.selectNetworkLogo}
                    onClick={() => this.setState({ menuToggled: !this.state.menuToggled })}
                />

                {this.state.menuToggled && (
                    <div className={styles.selectNetworkOptions}>
                        <div
                            className={styles.selectNetworkOption}
                            onClick={() => this.setNetwork(0)}
                        >
                            <img
                                src={tokenMap.get("Avax")}
                                className={styles.selectNetworkOptionImage}
                            />
                            <div className={styles.selectNetworkOptionText}>Avax</div>
                        </div>
                        <div
                            className={styles.selectNetworkOption}
                            onClick={() => this.setNetwork(1)}
                        >
                            <img
                                src={tokenMap.get("Sui")}
                                className={styles.selectNetworkOptionImage}
                            />
                            <div className={styles.selectNetworkOptionText}>Sui</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default SelectNetworkThing;