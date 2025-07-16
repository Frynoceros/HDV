import '../styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import AppWrapper from './AppWrapper';
import UnifiedLayout from '../components/UnifiedLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuery DevTools only in development to prevent it from being bundled in production
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then((mod) => ({ 
    default: mod.ReactQueryDevtools 
  })),
  { 
    ssr: false,
    loading: () => null
  }
);

export default function MyApp({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppWrapper>
          <UnifiedLayout>
            <Component {...pageProps} />
          </UnifiedLayout>
        </AppWrapper>
      </ErrorBoundary>
      {/* Only show React Query devtools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
