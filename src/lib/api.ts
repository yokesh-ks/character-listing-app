import { CharactersResponse } from '@/types/character'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

export async function fetchCharacters(page: number = 1, status?: string, name?: string): Promise<CharactersResponse> {
    const params = new URLSearchParams({ page: page.toString() })
    if (status && status !== 'all') {
        params.append('status', status)
    }
    if (name && name.trim()) {
        params.append('name', name.trim())
    }

    const url = `${BASE_URL}?${params.toString()}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Failed to fetch characters:', error)
        throw error
    }
}
