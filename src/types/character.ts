export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export interface Character {
    id: number
    name: string
    status: CharacterStatus
    species: string
    type: string
    gender: string
    image: string
    url: string
    created: string
    episode: string[]
    location: {
        name: string
        url: string
    }
    origin: {
        name: string
        url: string
    }
}

export interface CharactersResponse {
    info: {
        count: number
        pages: number
        next: string | null
        prev: string | null
    }
    results: Character[]
}
