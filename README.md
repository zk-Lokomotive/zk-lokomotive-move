# zk-lokomotive Sui

### Encrypting the File:
First, encrypt the file using zkSNARKs to ensure privacy and security. zkSNARKs allow you to prove the file’s integrity without revealing its contents.
Upload the encrypted file to a decentralized storage solution like Arweave, obtaining a unique file hash.

### Tokenizing the File Hash:
Create a token representing the file hash. This involves wrapping the hash into a token that can be transferred across different blockchain networks.
Use smart contracts to mint this token on the Sui network.

### Using the Wormhole Bridge:
Wormhole is a cross-chain bridge that facilitates the transfer of tokenized assets between different blockchains, including Sui and Solana.
The process involves locking the tokenized file hash on the Sui network and minting an equivalent token on the Solana network.
Guardians (validators) on the Wormhole network monitor the lock and mint actions to ensure they are synchronized across chains.

### Transmitting the Tokenized File Hash:
Initiate the transfer of the tokenized file hash from the Sui network to the Solana network using the Wormhole bridge.
The Wormhole protocol ensures the secure and verified transmission of the tokenized asset between networks.

### Verification and Access on Solana:
On the Solana side, the recipient can use the token to retrieve the file hash.
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
