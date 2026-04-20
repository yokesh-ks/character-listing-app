'use client'

import { useCallback, useMemo } from 'react'
import { Character } from '@/components/cards/Character'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from '@/components/ui/pagination'
import { Empty, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty'
import { SearchX, AlertCircle } from 'lucide-react'
import { fetchCharacters } from '@/lib/api'
import type { CharacterStatus, CharactersResponse, Character as CharacterType } from '@/types/character'
import { useSearchParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

export default function CharactersPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const page = Number(searchParams.get('page') || 1)
    const status = (searchParams.get('status') as CharacterStatus | null) || 'all'
    const name = searchParams.get('name') || ''

    const { data, isLoading, isError, error, refetch } = useQuery<CharactersResponse, Error>({
        queryKey: ['characters', page, status, name],
        queryFn: () => fetchCharacters(page, status, name),
    })

    const getErrorMessage = (err: unknown): string => {
        if (err instanceof Error) return err.message
        if (typeof err === 'string') return err
        return 'Failed to load characters.'
    }

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
                    <Select value={status} onValueChange={handleStatusChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="alive">Alive</SelectItem>
                            <SelectItem value="dead">Dead</SelectItem>
                        </SelectContent>
                    </Select>
            </div>

            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="aspect-square w-full rounded-lg" />
                            <div className="p-4 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isError && (
                <Empty>
                    <EmptyMedia variant="icon">
                        <AlertCircle className="size-8 text-destructive" />
                    </EmptyMedia>
                    <EmptyTitle>Something went wrong</EmptyTitle>
                    <EmptyDescription>
                        {getErrorMessage(error)}
                    </EmptyDescription>
                    <Button onClick={() => refetch()} variant="outline" size="sm">
                        Try Again
                    </Button>
                </Empty>
            )}

            {!isLoading && !isError && data && data.results.length === 0 && (
                <Empty>
                    <EmptyMedia variant="icon">
                        <SearchX className="size-8 text-muted-foreground" />
                    </EmptyMedia>
                    <EmptyTitle>No characters found</EmptyTitle>
                    <EmptyDescription>
                        Try adjusting your search or filter to find what you're looking for.
                    </EmptyDescription>
                </Empty>
            )}

            {!isLoading && !isError && data && data.results.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.results.map((character: CharacterType) => (
                            <Character key={character.id} character={character} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationPrevious
                                onClick={() => handlePageChange(page - 1)}
                            >
                                <Button
                                    variant={page === 1 ? "default" : "outline"}
                                    size="sm"
                                    disabled={page === 1}
                                >
                                    Previous
                                </Button>
                            </PaginationPrevious>

                            {paginationRange.map((item, idx) =>
                                item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                                    <PaginationEllipsis key={`ellipsis-${idx}`} />
                                ) : (
                                    <PaginationLink
                                        key={item}
                                        href={`?page=${item}&status=${status}&name=${name}`}
                                        isActive={page === item}
                                    >
                                        {item}
                                    </PaginationLink>
                                )
                            )}
                            <PaginationNext
                                onClick={() => handlePageChange(page + 1)}
                            >
                                <Button
                                    variant={page === totalPages ? "default" : "outline"}
                                    size="sm"
                                    disabled={page === totalPages}
                                >
                                    Next
                                </Button>
                            </PaginationNext>
                        </Pagination>
                    )}
                </>
            )}
        </div>
    )
}