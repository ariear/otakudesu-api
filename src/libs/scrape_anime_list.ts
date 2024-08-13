import { load } from "cheerio";
import { animeListType, listType } from "../types/anime_list";

const animeList = (animeListScrape: string) => {
    const results: animeListType[] = [];
    const animeListParse = animeListScrape.split('<div class="clear"></div>');
    animeListParse.forEach(list => {
        const $ = load(list);
        
        const anime_list: listType[] = [];
        const animes = $('.penzbar').toString().split('</li>');
        animes.forEach(anime => {
            const nime = load(anime);
            anime_list.push({
                title: nime('a').text().trim(),
                slug: nime('a').attr('href')?.split('/')[4]
            });
        });
        anime_list.splice(-1);

        results.push({
            abjad: $('.barispenz a').text(),
            anime_list: anime_list
        });
    });
    results.splice(-1);

    return results;
};

export { animeList };
