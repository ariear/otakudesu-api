import { Hono } from "hono";
import axios from "axios";
import { load } from "cheerio";
import { detailAnime } from "../../libs/scrape_detail_anime";

const animeRoute = new Hono();

animeRoute.get('/:slug', async (c) => {
    const slug = c.req.param('slug');
    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/anime/${slug}`);
    const $ = load(data);

    const detailAnimeScrape = $('.venser .fotoanime').toString();
    const batchAnimeScrape = $('.venser .episodelist:first ul li').toString()
    const fullDownloadAnimeScrape = $('.venser .episodelist:last ul li').toString()
    const episodeListAnimeScrape = $('.venser .episodelist:eq(1) ul li').toString()
    if (!detailAnimeScrape) {
        return c.json({
            message: 'Anime not found'
        }, 404);
    }
    const detailAnimeResult = detailAnime(
        detailAnimeScrape,
        batchAnimeScrape,
        fullDownloadAnimeScrape,
        episodeListAnimeScrape
    );

    return c.json(detailAnimeResult, 200);
});

export default animeRoute;
