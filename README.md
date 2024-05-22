# zk-lokomotive Sui

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
