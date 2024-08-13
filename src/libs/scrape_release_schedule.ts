import { load } from "cheerio";
import { animesType, scheduleResultType } from "../types/release_schedule";

const releaseSchedule = (scheduleScrape: string) => {
    const results: scheduleResultType[] = [];
    const scheduleParse = scheduleScrape.split('</div>');
    scheduleParse.forEach(schedule => {
        const $ = load(schedule);

        const animeList: animesType[] = [];
        const animes = $('ul li').toString().split('</li>');
        animes.forEach(anime => {
            const $nime = load(anime);
            animeList.push({
                title: $nime('a').text(),
                slug: $nime('a').attr('href')?.split('/')[4]
            });
        });
        animeList.splice(-1);

        results.push({
            day: $('h2').text(),
            animes: animeList
        });
    });
    results.splice(-2);

    return results;
};

export { releaseSchedule };
