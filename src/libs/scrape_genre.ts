import { load } from "cheerio";
import { genreListType } from "../types/genre";

const genreList = (genresScrape: string) => {
    const results: genreListType[] = [];
    const genresParse = genresScrape.split('</a>');
    genresParse.forEach(genre => {
        const $ = load(genre);
        results.push({
            name: $('a').text(),
            slug: $('a').attr('href')?.split('/')[2]
        });
    });
    results.splice(-1);

    return results;
};

export { genreList };
