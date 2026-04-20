import { ModeToggle } from "./mode-toggle"
import { appConfig, } from "@/config/app"
import { AppSidebar } from "./app-sidebar"

export function AppHeader() {
    return (
        <header className="bg-background sticky top-0 z-50 border-b">
            <div className="w-full ~max-w-7xl mx-auto flex items-center gap-2 h-14 px-4 md:px-8">
                <div className='flex items-center gap-2 md:gap-0'>
                    <AppSidebar />
                    <span className="font-semibold text-nowrap">{appConfig.name}</span>
                </div>

                <div className='ml-4 flex-1 flex items-center justify-end'>
                    <nav className="flex gap-1">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header >
    )
}
