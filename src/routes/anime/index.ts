import { Hono } from "hono";
import axios from "axios";
import { load } from "cheerio";
import { detailAnime, detailEps } from "../../libs/scrape_detail_anime";
import { searchAnime } from "../../libs/scrape_search_anime";

const animeRoute = new Hono();

animeRoute.get('/search', async (c) => {
    const { q } = c.req.query();
    if (!q) {
        return c.json({
            message: "Query not found"
        }, 404);
    };

    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/?s=${q}&post_type=anime`);
    const $ = load(data);

    const searchScrape = $('.vezone .venser .venutama .page .chivsrc li').toString();
    const searchResult = searchAnime(searchScrape);
    if (searchResult.length == 0) {
        return c.json({
            message: 'Anime not found'
        });
    };

    return c.json(searchResult, 200);
});

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

animeRoute.get('/episode/:eps', async (c) => {
    const { eps } = c.req.param();
    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/episode/${eps}`);
    const $ = load(data);

    const detailEpsScrape = $('#venkonten .venser').toString();
    if (!detailEpsScrape) {
        return c.json({
            message: 'Episode not found'
        }, 404);
    };
    const detailEpsResult = detailEps(detailEpsScrape);

    return c.json(detailEpsResult, 200);
});

export default animeRoute;
