import { AppProps } from 'next/app';

import '../../styles/global.scss';

import { FontContextProvider } from '../contexts/FontContext';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import VLibras from '@djpfs/react-vlibras';
import { LoadThemeProvider } from '../components/LoadThemeProvider';
import { AuthContextProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <ThemeContextProvider>
      <FontContextProvider>
        <AuthContextProvider>
          <LoadThemeProvider>
            <AnyComponent {...pageProps} />
            <VLibras />
          </LoadThemeProvider>
        </AuthContextProvider>
      </FontContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp;
