type AppConfigType = {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfigType = {
    name: "Character Listing App",
    github: {
        title: "Character Listing App Repository",
        url: "https://github.com/yokesh-ks/character-listing-app",
    },
    author: {
        name: "yokesh-ks",
        url: "https://github.com/yokesh-ks/",
    }
}

export const baseUrl = import.meta.env.VITE_BASE_URL ?? ""
