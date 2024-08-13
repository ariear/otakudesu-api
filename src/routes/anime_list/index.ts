import { Hono } from "hono";
import axios from "axios";
import { load } from 'cheerio';
import { animeList } from "../../libs/scrape_anime_list";

const animeListRoute = new Hono();

animeListRoute.get('/', async (c) => {
    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/anime-list`);
    const $ = load(data);

    const animeListScrape = $('#abtext .bariskelom').toString();
    const animeListResult = animeList(animeListScrape);
    
    return c.json(animeListResult, 200);
});

export default animeListRoute;
