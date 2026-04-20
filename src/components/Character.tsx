import { Card, CardContent } from "@/components/ui/card"
import type { Character as CharacterType } from "@/types/character"

interface CharacterProps {
    character: CharacterType
}

export function Character({ character }: CharacterProps) {
    return (
        <Card className="overflow-hidden">
            <div className="aspect-square w-full overflow-hidden bg-muted">
                <img
                    src={character.image}
                    alt={character.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg leading-none mb-1 truncate">
                    {character.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span
                        className={`inline-block w-2 h-2 rounded-full ${character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                    <span>{character.status}</span>
                </div>
            </CardContent>
        </Card>
    )
}
