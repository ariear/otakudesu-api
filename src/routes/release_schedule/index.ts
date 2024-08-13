import axios from "axios";
import { load } from "cheerio";
import { Hono } from "hono";
import { releaseSchedule } from "../../libs/scrape_release_schedule";

const releaseScheduleRoute = new Hono();

releaseScheduleRoute.get('/', async (c) => {
    const { data } = await axios.get(`${process.env.OTAKUDESU_URL}/jadwal-rilis`);
    const $ = load(data);

    const scheduleScrape = $('.vezone .venutama .page .kgjdwl321').toString();
    const scheduleResult = releaseSchedule(scheduleScrape);

    return c.json(scheduleResult);
});

export default releaseScheduleRoute;