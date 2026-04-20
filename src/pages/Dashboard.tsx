import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Character Listing App</PageHeaderHeading>
                <PageHeaderDescription>
                    Browse and manage characters from the Rick and Morty universe.
                </PageHeaderDescription>
            </PageHeader>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Characters</CardTitle>
                        <CardDescription>
                            View and filter all characters from the Rick and Morty API.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}
