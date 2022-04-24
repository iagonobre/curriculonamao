import { AppProps } from 'next/app';

import '../../styles/global.scss';

import { FontContextProvider } from '../contexts/FontContext';
import VLibras from '@djpfs/react-vlibras';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <FontContextProvider>
      <Component {...pageProps} />
      <VLibras />
    </FontContextProvider>
  )
}

export default MyApp;
