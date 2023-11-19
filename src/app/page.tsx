import { QueryClient, QueryClientProvider } from 'react-query';

import { cookies, headers } from 'next/headers';

import CustomInput from '@/components/CustomInput/CustomInput';

const queryClient = new QueryClient();

export default function Home() {
  cookies().get('session');
  headers().get('Origin');
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <CustomInput />
      </main>
    </QueryClientProvider>
  );
}
