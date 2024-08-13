type onGoingAnimeType = {
    title: string,
    slug: string | undefined,
    thumbnail: string | undefined,
    current_episode: string,
    release_day: string,
    latest_release_day: string
};

type completeAnimeType = {
    title: string,
    slug: string | undefined,
    thumbnail: string | undefined,
    rating: string,
    total_episode: string,
    latest_release_date: string
};

export {
    onGoingAnimeType,
    completeAnimeType
};
