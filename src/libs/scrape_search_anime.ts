import { load } from "cheerio";
import { animeType, genresType } from "../types/search";

const searchAnime = (searchScrape: string) => {
    const searchParse = searchScrape.split('</li>');
    const animes: animeType[] = [];

    searchParse.forEach(search => {
        const $ = load(search);

        const genres: genresType[] = [];
        const genresScrape = $('.set:eq(0) a').toString().split('</a>');
        genresScrape.forEach(genre => {
            const $genre = load(genre);
            genres.push({
                name: $genre('a').text(),
                slug: $genre('a').attr('href')?.split('/')[4]
            });
        });
        genres.splice(-1);
        
        animes.push({
            title: $('h2 a').text(),
            slug: $('h2 a').attr('href')?.split('/')[4],
            thumbnail: $('img').attr('src'),
            status: $('.set:eq(1)').text().replace('Status : ', ''),
            rating: $('.set:eq(2)').text().replace('Rating : ', ''),
            genres
        });
    });
    animes.splice(-1);

    return animes;
};

export { searchAnime };
