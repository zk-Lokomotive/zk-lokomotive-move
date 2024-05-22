# zk-lokomotive Sui

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

