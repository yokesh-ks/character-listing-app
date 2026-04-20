import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Character as CharacterType } from "@/types/character"

interface CharacterProps {
    character: CharacterType
}

export function Character({ character }: CharacterProps) {
    const statusConfig = {
        Alive: { color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900", label: "Alive" },
        Dead: { color: "bg-red-500", textColor: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900", label: "Dead" },
        unknown: { color: "bg-gray-400", textColor: "text-gray-600", bgColor: "bg-gray-100 dark:bg-gray-800", label: "Unknown" },
    }

    const status = statusConfig[character.status as keyof typeof statusConfig] || statusConfig.unknown

    return (
        <Card className="overflow-hidden p-0 gap-0 hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <img
                    src={character.image}
                    alt={character.name}
                    className="h-full w-full object-cover transition-transform hover:scale-110 duration-300"
                    loading="lazy"
                />
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className={`${status.bgColor} ${status.textColor} border-none`}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${status.color}`} />
                        {status.label}
                    </Badge>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-4 space-y-3">
                {/* Name */}
                <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[2.5rem]" title={character.name}>
                    {character.name}
                </h3>

                {/* Pills Row */}
                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs font-medium">
                        {character.species}
                    </Badge>
                    {character.type && character.type !== character.species && (
                        <Badge variant="secondary" className="text-xs font-normal">
                            {character.type}
                        </Badge>
                    )}
                    <Badge variant="outline" className="text-xs capitalize">
                        {character.gender}
                    </Badge>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground line-clamp-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span title={character.location.name} className="truncate">
                        {character.location.name}
                    </span>
                </div>

                {/* Episodes & Status Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{character.episode.length} episodes</span>
                    </div>
                    <span className={`text-xs font-semibold ${status.textColor}`}>
                        {status.label}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}