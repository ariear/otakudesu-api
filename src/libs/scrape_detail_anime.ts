import { load } from "cheerio";
import { episodeType, genreType } from "../types/detail_anime";

const detailAnime = (
    detailAnimeScrape: string,
    batchAnimeScrape: string,
    fullDownloadAnimeScrape: string,
    episodeListAnimeScrape: string) => {

    const $ = load(detailAnimeScrape); 

    const genresScrape = $(classInfoTemplate(11)).toString().split('</a>');
    const genres: genreType[] = [];
    genresScrape.forEach(genre => {
        const $genre = load(genre);

        genres.push({
            name: $genre('a').text(),
            slug: $genre('a').attr('href')?.split('/')[4]
        });
    });
    genres.splice(-1);

    const $batch = load(batchAnimeScrape);
    const $fullDownload = load(fullDownloadAnimeScrape);

    const episodeListParse = episodeListAnimeScrape.split('</li>');
    const episodes: episodeType[] = [];
    episodeListParse.forEach(episode => {
        const $epi = load(episode);
        episodes.push({
            episode: $epi('span a').text(),
            slug: $epi('span a').attr('href')?.split('/')[4]
        });
    });
    episodes.splice(-1);

    const result = {
        title: $(classInfoTemplate(1)).text().replace('Judul: ', ''),
        japanese_title: $(classInfoTemplate(2)).text().replace('Japanese: ', ''),
        thumbnail: $('img').attr('src'),
        score: $(classInfoTemplate(3)).text().replace('Skor: ', ''),
        producer: $(classInfoTemplate(4)).text().replace('Produser: ', ''),
        type: $(classInfoTemplate(5)).text().replace('Tipe: ', ''),
        status: $(classInfoTemplate(6)).text().replace('Status: ', ''),
        total_episode: $(classInfoTemplate(7)).text().replace('Total Episode: ', ''),
        duration: $(classInfoTemplate(8)).text().replace('Durasi: ', ''),
        release_date: $(classInfoTemplate(9)).text().replace('Tanggal Rilis: ', ''),
        studio: $(classInfoTemplate(10)).text().replace('Studio: ', ''),
        genres: genres,
        synopsis: $('.sinopc p').text(),
        batch: {
            slug: $batch('span:nth-of-type(1) a').attr('href')?.split('/')[4],
            date_upload: $batch('.zeebr').text()
        },
        full_download_slug: $fullDownload('span a').attr('href')?.split('/')[4],
        episode_list: episodes.reverse()
    };

    return result;
};

const classInfoTemplate = (index: number) => {
    return `.infozin .infozingle p:nth-of-type(${index}) span`;
};

export { detailAnime };