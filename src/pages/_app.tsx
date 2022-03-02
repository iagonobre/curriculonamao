import { AppProps } from 'next/app';

import '../../styles/global.scss';

import { FontContextProvider } from '../contexts/FontContext';
import { AcessibilityArea } from '../components/AccessibilityArea';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <FontContextProvider>
      <AcessibilityArea>
        <Component {...pageProps} />
      </AcessibilityArea>
    </FontContextProvider>
  )
}

export default MyApp;
