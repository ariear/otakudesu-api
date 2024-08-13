type listType = {
    title: string,
    slug: string | undefined
}

type animeListType = {
    abjad: string,
    anime_list: listType[]
};

export { animeListType, listType };
