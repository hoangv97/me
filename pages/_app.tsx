import { AppProps } from 'next/app';
import '../styles/index.css';

interface CustomAppProps extends AppProps {
  Component: any;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  return <Component {...pageProps} />;
}
