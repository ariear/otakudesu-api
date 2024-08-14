import { load } from "cheerio";
import { downloadType, episodeType, genreType, urlType } from "../types/detail_anime";

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
            slug: $batch('span:nth-of-type(1) a').attr('href')?.split('/')[4] || null,
            date_upload: $batch('.zeebr').text() || null
        },
        full_download_slug: $fullDownload('span a').attr('href')?.split('/')[4] || null,
        episode_list: episodes.reverse()
    };

    return result;
};

const classInfoTemplate = (index: number) => {
    return `.infozin .infozingle p:nth-of-type(${index}) span`;
};

const detailEps = (detailEpsScrape: string) => {
    const $ = load(detailEpsScrape);

    const downloadUrls: downloadType[] = [];
    const downloadUrlsParse = $('.venutama .download ul li').toString().split('</li>');
    downloadUrlsParse.forEach(download => {
        const $down = load(download);

        const urls: urlType[] = [];
        const urlsParse = $down('a').toString().split('</a>');
        urlsParse.forEach(url => {
            const $a = load(url);
            urls.push({
                provider: $a('a').text(),
                url: $a('a').attr('href')
            });
        });
        urls.splice(-1);

        downloadUrls.push({
            resolution: $down('strong').text(),
            size: $down('i').text(),
            urls
        });
    });
    downloadUrls.splice(-1);

    const nextprevEps = $('.venutama .prevnext .flir a').toString().split('</a>');
    nextprevEps.splice(-1);
    let nextEps: string | undefined | null = '';
    if ($(nextprevEps[1]).text() == 'Next Eps.') {
        nextEps = $(nextprevEps[1]).attr('href')?.split('/')[4];
    } else if ($(nextprevEps[2]).text() == 'Next Eps.') {
        nextEps = $(nextprevEps[2]).attr('href')?.split('/')[4];
    } else {
        nextEps = null;
    };
    
    return {
        episode: $('.venutama .posttl').text(),
        anime: {
            title: $('.venutama .posttl').text().split(' Episode')[0],
            slug: $('.venutama .prevnext .flir a:eq(1)').text() == 'See All Episodes' ? $('.venutama .prevnext .flir a:eq(1)').attr('href')?.split('/')[4] : $('.venutama .prevnext .flir a:eq(0)').attr('href')?.split('/')[4]
        },
        next_episode_slug: nextEps,
        prev_episode_slug: $(nextprevEps[0]).text() == 'Previous Eps.' ? $(nextprevEps[0]).attr('href')?.split('/')[4] : null,
        stream_url: $('.venutama #pembed iframe').attr('src'),
        download_urls: downloadUrls
    };
};

export { detailAnime, detailEps };
