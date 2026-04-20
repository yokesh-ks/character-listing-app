'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { Character } from '@/components/Character'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchCharacters } from '@/lib/api'
import { CharactersResponse, CharacterStatus } from '@/types/character'
import { useSearchParams } from 'react-router-dom'

export default function CharactersPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState<CharactersResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const page = Number(searchParams.get('page') || 1)
    const status = (searchParams.get('status') as CharacterStatus | null) || 'all'
    const name = searchParams.get('name') || ''

    const fetch = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await fetchCharacters(page, status, name)
            setData(result)
        } catch (err) {
            setError('Failed to load characters.')
        } finally {
            setLoading(false)
        }
    }, [page, status, name])

    useEffect(() => {
        fetch()
    }, [fetch])

    const updateFilter = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        params.set('page', '1')
        setSearchParams(params)
    }, [searchParams, setSearchParams])

    const handleStatusChange = useCallback((value: string) => {
        updateFilter('status', value)
    }, [updateFilter])

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter('name', e.target.value)
    }, [updateFilter])

    const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', newPage.toString())
        setSearchParams(params)
    }, [searchParams, setSearchParams])

    const totalPages = data?.info.pages ?? 1

    const paginationRange = useMemo(() => {
        const range: (number | 'ellipsis-start' | 'ellipsis-end')[] = []
        const maxButtons = 5
        if (totalPages <= maxButtons) {
            for (let i = 1; i <= totalPages; i++) range.push(i)
        } else {
            if (page <= 3) {
                range.push(1, 2, 3, 4, 'ellipsis-end', totalPages)
            } else if (page >= totalPages - 2) {
                range.push(1, 'ellipsis-start', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                range.push(1, 'ellipsis-start', page - 1, page, page + 1, 'ellipsis-end', totalPages)
            }
        }
        return range
    }, [page, totalPages])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search by name..."
                        value={name}
                        onChange={handleNameChange}
                        className="max-w-sm"
                    />
                </div>
                <div className="w-[180px]">
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="all">All</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                    </select>
                </div>
            </div>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-square w-full bg-muted rounded-lg" />
                            <div className="p-4 space-y-2">
                                <div className="h-4 bg-muted rounded w-3/4" />
                                <div className="h-3 bg-muted rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="text-center text-destructive py-8">
                    {error}
                </div>
            )}

            {!loading && !error && data && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.results.map((character) => (
                            <Character key={character.id} character={character} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>

                            {paginationRange.map((item, idx) =>
                                item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                                    <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                                        ...
                                    </span>
                                ) : (
                                    <Button
                                        key={item}
                                        variant={page === item ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handlePageChange(item as number)}
                                        className="min-w-9"
                                    >
                                        {item}
                                    </Button>
                                )
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
