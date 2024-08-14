import axios from "axios";
import { load } from "cheerio";
import { Hono } from "hono";
import { genreList } from "../../libs/scrape_genre";

const genreRoute = new Hono();

genreRoute.get('/', async (c) => {
    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/genre-list`);
    const $ = load(data);

    const genresScrape = $('.vezone .venser .genres li a').toString();
    const genresResult = genreList(genresScrape);

    return c.json(genresResult, 200);
});

export default genreRoute;
