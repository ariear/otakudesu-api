type genresType = {
    name: string,
    slug: string | undefined
};

type animeType = {
    title: string,
    slug: string | undefined,
    thumbnail: string | undefined,
    status: string,
    rating: string,
    genres: genresType[]
}

export { genresType, animeType };
