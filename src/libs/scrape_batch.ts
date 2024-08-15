import { load } from "cheerio";
import { downloadType, urlType } from "../types/detail_anime";

const batchAnime = (animeScrape: string) => {
    const $ = load(animeScrape);

    const downloads: downloadType[] = [];
    const downloadParse = $('.download2 .batchlink ul li').toString().split('</li>');
    downloadParse.forEach(download => {
        const $down = load(download);

        const urls: urlType[] = [];
        const urlsParse = $down('a').toString().split('</a>');
        urlsParse.forEach(url => {
            const $url = load(url);
            urls.push({
                provider: $url('a').text(),
                url: $url('a').attr('href')
            });
        });
        urls.splice(-1);

        downloads.push({
            resolution: $down('strong').text(),
            size: $down('i').text(),
            urls
        });
    });
    downloads.splice(-1);

    return {
        anime: {
            title: $('.animeinfo .kiri .data .infos').text().match(/Judul:\s*(.*?)Japanese:/)?.[1].trim(),
            slug: $('.animeinfo .kiri .data .totalepisode h3 a').attr('href')?.split('/')[4]
        },
        total_episode: $('.animeinfo .kiri .data .totalepisode .total').text(),
        download_urls: downloads
    };
};

export { batchAnime };