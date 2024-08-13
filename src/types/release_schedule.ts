type animesType = {
    title: string,
    slug: string | undefined
};

type scheduleResultType = {
    day: string,
    animes: animesType[] 
};

export { scheduleResultType, animesType };