import { Hono } from "hono";
import axios from 'axios';
import { load } from 'cheerio';
import { completeAnime, onGoingAnime } from "../../libs/scrape_home";

const homeRoute = new Hono();

homeRoute.get('/', async (c) => {
    const { data } = await axios.get(process.env.OTAKUDESU_URL || '');
    const $ = load(data);
    
    const onGoingAnimeScrape = $('.venutama .rseries .rapi:first .venz ul li').toString();
    const onGoingAnimeResult = onGoingAnime(onGoingAnimeScrape);

    const completeAnimeScrape = $('.venutama .rseries .rapi:last .venz ul li').toString();
    const completeAnimeResult = completeAnime(completeAnimeScrape);
    
    return c.json({
        ongoing_anime: onGoingAnimeResult,
        complete_anime: completeAnimeResult
    }, 200);
});

export default homeRoute;
