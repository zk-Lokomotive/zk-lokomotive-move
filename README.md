# zk-lokomotive-sui

Sui Hackerhouse Version of "zk-lokomotive"

```bash
git clone https://github.com/MystenLabs/sui.git
cd sui
cargo build --release
```

```bash
cd ~/sui
./target/release/sui client new-address ed25519
./target/release/sui client sync
```

├── contracts/ # Move smart contracts
│ ├── FileManager.move # Manages file metadata and encryption evidence
│ └── AccessControl.move # Manages file access control
│
├── scripts/ # Scripts written with Node.js
│ ├── encryptAndUpload.js # Encrypts files and uploads them to IPFS
│ ├── requestDownload.js # Manages file download request
│ └── verifyAndDownload.js# Verifies files and downloads them from IPFS
│
├── ipfs/ # IPFS related configurations and helper files
│ └── ipfsConfig.js # IPFS client configuration
│
├── utils/ # Auxiliary functions and tools
│ ├── cryptoUtils.js # Utility functions for encryption operations
│ └── contractUtils.js # Utility functions for smart contract transactions
│
├── test/ # Test scenarios
│ ├── contractTests.js # Smart contract tests
│ └── integrationTests.js # Integration tests
│
├── package.json # Node.js project dependencies and scripts
└── README.md # Project documentation
