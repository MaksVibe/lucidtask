'use client';
import { QueryClient, QueryClientProvider } from 'react-query';

import CustomInput from '@/components/CustomInput/CustomInput';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <CustomInput />
      </main>
    </QueryClientProvider>
  );
}
