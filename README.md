# mx-sdk-js-web-wallet-iframe-provider

Alpha Version 0.1

Signing provider for dApps: Web Wallet Iframe Provider with support for multiple login methods including **Gaupa Login**.

Documentation is available on [docs.multiversx.com](https://docs.multiversx.com/sdk-and-tools/sdk-js/sdk-js-signing-providers), while an integration example can be found [here](https://github.com/multiversx/mx-sdk-js-examples/tree/main/signing-providers).

Note that **we recommend using [sdk-dapp](https://github.com/multiversx/mx-sdk-dapp)** instead of integrating the signing provider on your own.

## Supported Login Providers

This iframe provider supports multiple login methods:

- **MetaMask** - Traditional Web3 wallet integration
- **Passkey** - Passwordless authentication using WebAuthn
- **Gaupa Login** - Social login integration for:
  - TikTok
  - Twitter  
  - Google
  - Email

### Gaupa Login

Gaupa Login provides seamless social authentication integration, allowing users to connect their social media accounts or email for a frictionless login experience. Wallet management, transactions, gas fees etc... are managed in the background. Making using and building on MultiversX easier.


## Distribution

[npm](https://www.npmjs.com/package/@multiversx/mx-sdk-js-web-wallet-iframe-provider)

## Installation

`sdk-web-wallet-iframe-provider` is delivered via [npm](https://www.npmjs.com/package/@multiversx/sdk-web-wallet-iframe-provider), therefore it can be installed as follows:

```
npm install @multiversx/sdk-web-wallet-iframe-provider
```

## Usage

### Basic Setup

```typescript
import { IframeProvider, IframeLoginTypes } from '@multiversx/sdk-web-wallet-iframe-provider';

const provider = IframeProvider.getInstance();

// Set the login type (default is Google)
provider.setLoginType(IframeLoginTypes.google);

// Initialize the provider
await provider.init();

// Set wallet URL
// Metamask & Passkey
provider.setWalletUrl('https://wallet.multiversx.xyz')

// Gaupa Logins
provider.setWalletUrl('https://vibe.gaupa.xyz');

// Login
const account = await provider.login();
```

### Available Login Types

```typescript
import { IframeLoginTypes } from '@multiversx/sdk-web-wallet-iframe-provider';

// Traditional Web3
provider.setLoginType(IframeLoginTypes.metamask);

// Passwordless authentication
provider.setLoginType(IframeLoginTypes.passkey);

// Social login via Gaupa
provider.setLoginType(IframeLoginTypes.tiktok);
provider.setLoginType(IframeLoginTypes.twitter);
provider.setLoginType(IframeLoginTypes.google);
provider.setLoginType(IframeLoginTypes.mail);
```

### Building the library

In order to compile the library, run the following:

```
npm install
npm run compile
```
