import axios from "axios";
import { load } from "cheerio";
import { Hono } from "hono";
import { onGoing } from "../../libs/scrape_ongoing_complete";

const ongoingRoute = new Hono();

ongoingRoute.get('/:page', async (c) => {
    const { page } = c.req.param();
    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/ongoing-anime/page/${page}`);
    const $ = load(data);

    const ongoingScrape = $('#venkonten .vezone .venser .venutama').toString();
    const ongoingResult = onGoing(ongoingScrape);
    if (ongoingResult.animes.length == 0) {
        return c.json({
            message: "Page not found"
        }, 404);
    }

    return c.json(ongoingResult, 200);
});

export default ongoingRoute;
