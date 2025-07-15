import '../styles/globals.css';
import AppWrapper from './AppWrapper';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

export default function MyApp({Component, pageProps}) {
  return (
    <AppWrapper>
      <Layout>
        <div className="flex flex-row">
          <div className="min-w-1/6 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="w-5/6 flex justify-center">
            <Component {...pageProps} />
          </div>
        </div>
      </Layout>
    </AppWrapper>
  );
}
