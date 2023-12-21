import Layout from '@/components/layout/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NotificationContextProvider } from '@/store/notification-context';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Event Navigator</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
