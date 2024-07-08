# zk-lokomotive Overflow
* Zk based fully secure and trustless multichain file transfer system with Sui-EVM-Wormhole.


### [Solana Renaissance Hackathon Wormhole Best Multichain Track Winner 1st 😎🥇](https://earn.superteam.fun/listings/hackathon/build-multichain-apps-using-wormhole/) 

<div align="center">
  <img src="https://github.com/zk-Lokomotive/zk-lokomotive/assets/158029357/1da98901-0a85-4ff9-b6ce-8e22b142efd8"alt="wormhole tweet" width="400"/>
</div>

Author: [Baturalp Güvenç](https://github.com/virjilakrum)

<div align="center">
  <img src="https://github.com/zk-Lokomotive/zk-lokomotive-sui/assets/158029357/e9a98533-894e-4902-9e8c-539d86d0e764" alt="logo" width="200"/>
</div>

### **Demo Video (Sui-Avalanche)**

[WATCH THE DEMO VIDEO](https://youtu.be/WpamMm3GP8U)
## **1. Introduction**
### **1.1 Project Overview**
Our project aims to enable secure, private, and efficient file transfers across different blockchain networks. Utilizing zkSNARKs for encryption, Arweave for decentralized storage, and the Wormhole bridge for cross-chain token transfer, we ensure that files can be shared securely from Sui to EVM networks.

### **1.2 Problem Statement**
Traditional file transfer methods often suffer from privacy and security vulnerabilities. Centralized servers are prone to data breaches, and current blockchain solutions lack seamless interoperability.

## **2. Objectives**

### Demo Architecture
![Architecture](https://github.com/zk-Lokomotive/zk-lokomotive-sui/assets/158029357/fac7287e-a440-4afe-95e6-6dd008811240)

- Encrypt files using zkSNARKs to ensure privacy and integrity.
- Store encrypted files on Arweave with a unique file hash.
- Tokenize the file hash for transfer across blockchain networks.
- Utilize the Wormhole bridge to securely transfer tokenized assets from Sui to EVM.
- Verify and retrieve the file on the receiving network, ensuring the file's integrity.

## **3. Technology Stack**
### **3.1 zkSNARKs**
- **Purpose:** Secure file encryption.
- **Benefit:** Ensures that file content remains private while allowing verification of its integrity.

### **3.2 Arweave**
- **Purpose:** Decentralized storage solution.
- **Benefit:** Provides permanent and tamper-proof storage for encrypted files.

### **3.3 Wormhole Bridge**
- **Purpose:** Cross-chain token transfer.
- **Benefit:** Facilitates seamless and secure movement of tokenized assets between blockchain networks.

### **3.4 Sui and EVM Networks**
- **Sui Network:** Source network for initiating the file transfer.
- **EVM Network:** Destination network for receiving and verifying the file.

## **4. Process Workflow**
### **4.1 Encryption and Storage**
1. **Encrypt File:** Use zkSNARKs to encrypt the file.
2. **Store on Arweave:** Upload the encrypted file to Arweave, obtaining a unique file hash.

### **4.2 Tokenization and Transfer**
3. **Tokenize File Hash:** Create a token representing the file hash on the Sui network.
4. **Initiate Transfer:** Use the Wormhole bridge to lock the token on Sui and mint an equivalent token on EVM.

### **4.3 Verification and Retrieval**
5. **Verify on EVM:** The recipient verifies the file hash against the encrypted file on Arweave.
6. **Retrieve File:** Ensure the file's integrity and authenticity, completing the transfer.

## **5. Benefits**
- **Privacy:** zkSNARK encryption guarantees that file contents remain confidential.
- **Security:** Decentralized storage and cross-chain verification ensure data integrity and authenticity.
- **Interoperability:** Wormhole bridge facilitates seamless and efficient cross-chain asset transfers.
- **Scalability:** Leveraging EVM’s high-speed and low-cost transactions.

## **6. Use Cases**
- **Research Data Sharing:** Securely share sensitive research data across blockchain networks.
- **Healthcare Records:** Transfer patient records securely between medical institutions.
- **Intellectual Property:** Protect and transfer proprietary information between collaborating entities.

## **7. Roadmap**
### **7.1 Phase 1: Development**
- Implement zkSNARK encryption for file security.
- Integrate Arweave for decentralized file storage.

### **7.2 Phase 2: Integration**
- Develop tokenization process for file hashes.
- Implement Wormhole bridge for cross-chain transfers between Sui and EVM.

### **7.3 Phase 3: Testing and Deployment**
- Conduct thorough testing for security and efficiency.
- Deploy the solution on mainnet and conduct a pilot transfer.

### **7.4 Phase 4: Expansion**
- Explore integration with additional blockchain networks.
- Develop user-friendly interfaces for easy adoption.

## **8. Team**
- **Baturalp Güvenç:** Project Manager / Smart Contract Developer 
- **Yunus Emre Yoldaş:** Cryptologist / Backend Developer
- **Ferit Yiğit Balaban:** UI Developer

## **9. Conclusion**
Our project offers a robust solution for secure cross-chain file transfers, addressing the critical needs of privacy, security, and interoperability. By leveraging advanced cryptographic techniques and decentralized technologies, we aim to revolutionize the way sensitive data is shared across blockchain networks.

## **10. Contact Information**
- **Email:** asesenep15@gmail.com
- **Website:** [zk-lokomotive.xyz](https://zk-lokomotive.xyz)


---

## **Appendix**
### **A. Technical Details**
- Detailed encryption algorithm specifications.
- Smart contract code for tokenization and transfer.
- Technical architecture diagrams.

### **B. Glossary**
- **zkSNARKs:** Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge.
- **Arweave:** A blockchain-based decentralized storage network.
- **Wormhole Bridge:** A cross-chain bridge enabling token transfers between blockchains.

---

### Encrypting the File:
First, encrypt the file using zkSNARKs to ensure privacy and security. zkSNARKs allow you to prove the file’s integrity without revealing its contents.
Upload the encrypted file to a decentralized storage solution like Arweave, obtaining a unique file hash.

### Tokenizing the File Hash:
Create a token representing the file hash. This involves wrapping the hash into a token that can be transferred across different blockchain networks.
Use smart contracts to mint this token on the Sui network.

### Using the Wormhole Bridge:
Wormhole is a cross-chain bridge that facilitates the transfer of tokenized assets between different blockchains, including Sui and EVM.
The process involves locking the tokenized file hash on the Sui network and minting an equivalent token on the EVM network.
Guardians (validators) on the Wormhole network monitor the lock and mint actions to ensure they are synchronized across chains.

### Transmitting the Tokenized File Hash:
Initiate the transfer of the tokenized file hash from the Sui network to the EVM network using the Wormhole bridge.
The Wormhole protocol ensures the secure and verified transmission of the tokenized asset between networks.

### Verification and Access on EVM:
On the EVM side, the recipient can use the token to retrieve the file hash.
Verify the file hash against the encrypted file stored on Arweave to ensure integrity and authenticity.



## Prerequisites

Before you begin, install the following:

- [Sui prerequisites](https://docs.sui.io/build/install#prerequisites) (Sui prerequisites only)
- [Suibase](https://suibase.io/how-to/install.html)
- [Docker](https://docs.docker.com/engine/install/)
- [Node (>= 20)](https://nodejs.org/en/download/)
- [pnpm (>= 9)](https://pnpm.io/installation)


```bash
pnpm create sui-dapp@latest
```

## Usage
[package]
name = "greeting"
edition = "2024.beta" # edition = "legacy" to use legacy (pre-2024) Move

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/devnet" }

 For remote import, use the `{ git = "...", subdir = "...", rev = "..." }`.
 Revision can be a branch, a tag, and a commit hash.
 MyRemotePackage = { git = "https://some.remote/host.git", subdir = "remote/path", rev = "main" }

 For local dependencies use `local = path`. Path is relative to the package root
 Local = { local = "../path/to" }

 To resolve a version conflict and force a specific version for dependency
 override use `override = true`
 Override = { local = "../conflicting/version", override = true }

[addresses]
greeting = "0x0"

 Named addresses will be accessible in Move as `@name`. They're also exported:
 for example, `std = "0x1"` is exported by the Standard Library.
 alice = "0xA11CE"

[dev-dependencies]
 The dev-dependencies section allows overriding dependencies for `--test` and
 `--dev` modes. You can introduce test-only dependencies here.
 Local = { local = "../path/to/dev-build" }

[dev-addresses]
 The dev-addresses section allows overwriting named addresses for the `--test`
 and `--dev` modes.
 alice = "0xB0B"


#### 1. Run the local Sui network:

```bash
pnpm localnet:start
```

Local Sui Explorer will be available on [localhost:9001](http://localhost:9001/)

#### 2. Deploy the demo contract to the local network:

```bash
pnpm localnet:deploy
```

#### 3. Fund your localnet account via Sui Wallet or the faucet:

```bash
pnpm localnet:faucet 0xYOURADDRESS
```

#### 4. Run the app:

```bash
pnpm start
```

## Deployment (frontend)

Follow [this guide](https://sui-dapp-starter.dev/docs/frontend/deployment/firebase) to deploy the frontend app to Firebase.

### Firebase

To deploy the frontend part, do the following:

1. Install Firebase Tools

```bash
pnpm add -g firebase-tools
```

2. Create a new project on Firebase

Login to Firebase Console and create a new empty project.

3. Init your project

```bash
pnpm frontend:deploy:init
```
* You will be asked to [Login to Firebase.](https://console.firebase.google.com/)
* Then select your newly created Firebase project from the list.
* Once you're asked for a project alias, enter default.

4. Deploy to Firebase

```bash
pnpm frontend:deploy
```


## Test

```bash
pnpm test
```

_Currently we have blockchain tests only._

## Documentation

The project documentation can be found [here](https://zk-lokomotive.xyz).

## Roadmap



## Community

[Join our Discord]()

## Links
