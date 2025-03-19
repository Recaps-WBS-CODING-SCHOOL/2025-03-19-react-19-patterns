import { Suspense, useState /*useMemo*/ } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from './utils/toastSettings';
import { getAllDucks } from './data/ducks';

import LoadingPage from './components/loadingUI/LoadingPage';
import DuckContextProvider from './context/DuckContextProvider';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Counter from './components/Counter';
import DuckSection from './components/DuckSection';
import AddSection from './components/AddSection';
import Footer from './components/Footer';

function App() {
    const [counter, setCounter] = useState(0);
    // const ducksPromise = useMemo(() => getAllDucks(), []);
    const ducksPromise = getAllDucks();
    return (
        <ErrorBoundary fallback={<p>Something went wrong!</p>}>
            <Suspense fallback={<LoadingPage />}>
                <DuckContextProvider ducksData={ducksPromise}>
                    <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
                        <Navbar />
                        <Header />
                        <Counter counter={counter} setCounter={setCounter} />
                        <main className='flex-grow flex flex-col justify-between py-4'>
                            <DuckSection />
                            <AddSection />
                        </main>
                        <Footer />
                    </div>
                    <Toaster
                        position='bottom-right'
                        toastOptions={toastOptions}
                    />
                </DuckContextProvider>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
