import { load } from "cheerio";
import { completeAnimeType, onGoingAnimeType } from "../types/home";

const onGoing = (ongoingScrape: string) => {
    const $ = load(ongoingScrape);

    const animeList: onGoingAnimeType[] = [];
    const animeListParse = $('.rseries .rapi .venz ul li').toString().split('</li>');
    animeListParse.forEach(anime => {
        const $nime = load(anime);
        animeList.push({
            title: $nime('.thumb a .thumbz h2').text(),
            slug: $nime('.thumb a').attr('href')?.split('/')[4],
            thumbnail: $nime('.thumbz img').attr('src'),
            current_episode: $nime('.detpost .epz').text().trim(),
            release_day: $nime('.detpost .epztipe').text().trim(),
            latest_release_day: $nime('.detpost .newnime').text()
        });
    });
    animeList.splice(-1);

    return {
        pagination: {
            current_page: Number($('.pagination .pagenavix .current').text()),
            next_page: Number($('.pagination .pagenavix .next').attr('href')?.split('/')[5]),
            prev_page: Number($('.pagination .pagenavix .prev').attr('href')?.split('/')[5])
        },
        animes: animeList
    };
};

const complete = (completeScrape: string) => {
    const $ = load(completeScrape);

    const animeList: completeAnimeType[] = [];
    const animeListParse = $('.rseries .rapi .venz ul li').toString().split('</li>');
    animeListParse.forEach(anime => {
        const $nime = load(anime);
        animeList.push({
            title: $nime('.thumb a .thumbz h2').text(),
            slug: $nime('.thumb a').attr('href')?.split('/')[4],
            thumbnail: $nime('.thumbz img').attr('src'),
            rating: $nime('.detpost .epztipe').text().trim(),
            total_episode: $nime('.detpost .epz').text().trim(),
            latest_release_date: $nime('.detpost .newnime').text()
        });
    });
    animeList.splice(-1);

    return {
        pagination: {
            current_page: Number($('.pagination .pagenavix .current').text()),
            next_page: Number($('.pagination .pagenavix .next').attr('href')?.split('/')[5]),
            prev_page: Number($('.pagination .pagenavix .prev').attr('href')?.split('/')[5])
        },
        animes: animeList
    };
};

export { onGoing, complete };
