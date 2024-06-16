import '../styles/global.scss'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import '@suiet/wallet-kit/style.css';
import { WalletProvider } from '@suiet/wallet-kit';


export default function App({ Component, pageProps }) {
  return <WalletProvider>
    <Component {...pageProps} />

  </WalletProvider>
}
