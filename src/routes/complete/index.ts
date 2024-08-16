import axios from "axios";
import { load } from "cheerio";
import { Hono } from "hono";
import { complete } from "../../libs/scrape_ongoing_complete";

const completeRoute = new Hono();

completeRoute.get('/:page', async (c) => {
    const { page } = c.req.param();
    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/complete-anime/page/${page}`);
    const $ = load(data);

    const completeScrape = $('#venkonten .vezone .venser .venutama').toString();
    const completeResult = complete(completeScrape);
    if (completeResult.animes.length == 0) {
        return c.json({
            message: "Page not found"
        }, 404);
    }

    return c.json(completeResult, 200);
});

export default completeRoute;
