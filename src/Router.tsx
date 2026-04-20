import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/app-layout'
import Dashboard from './pages/Dashboard'
import CharactersPage from './pages/CharactersPage'

export default function Router() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="characters" element={<CharactersPage />} />
            </Route>
        </Routes>
    )
}
