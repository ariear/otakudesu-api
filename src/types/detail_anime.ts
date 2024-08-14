type genreType = {
    name: string,
    slug: string | undefined
};

type episodeType = {
    episode: string,
    slug: string | undefined
};

type urlType = {
    provider: string,
    url: string | undefined
};

type downloadType = {
    resolution: string,
    size: string,
    urls: urlType[]
};

export { 
    genreType,
    episodeType,
    urlType,
    downloadType
};
