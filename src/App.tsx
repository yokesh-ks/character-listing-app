import { BrowserRouter, HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeContext'
import Router from './Router'

const AppRouter = import.meta.env.VITE_USE_HASH_ROUTE === 'true' ? HashRouter : BrowserRouter

export default function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                gcTime: 30 * 60 * 1000,
                retry: false,
            },
        },
    })

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AppRouter>
                    <Router />
                </AppRouter>
            </QueryClientProvider>
        </ThemeProvider>
    )
}
