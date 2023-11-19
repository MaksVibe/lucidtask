import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import CustomInput from './components/CustomInput/CustomInput';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <CustomInput />
      </div>
    </QueryClientProvider>
  );
}

export default App;
