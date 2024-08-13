import { load } from 'cheerio';
import { completeAnimeType, onGoingAnimeType } from '../types/home';

const onGoingAnime = (onGoingAnimeScrape: string): onGoingAnimeType[] => {
    const results: onGoingAnimeType[] = [];
    const onGoingAnimeParse = onGoingAnimeScrape.split('</li>');
    onGoingAnimeParse.forEach(anime => {
        const $ = load(anime);

        results.push({
            title: $('.detpost .thumb .thumbz .jdlflm').text(),
            slug: $('.detpost .thumb a').attr('href')?.split('/')[4],
            thumbnail: $('.detpost .thumb .thumbz img').attr('src'),
            current_episode: $('.detpost .epz').text().trim(),
            release_day: $('.detpost .epztipe').text().trim(),
            latest_release_day: $('.detpost .newnime').text()
        });
    });
    results.splice(-1);

    return results;
};

const completeAnime = (completeAnimeScrape: string): completeAnimeType[] => {
    const results: completeAnimeType[] = [];
    const completeAnimeParse = completeAnimeScrape.split('</li>');
    completeAnimeParse.forEach(anime => {
        const $ = load(anime);

        results.push({
            title: $('.detpost .thumb .thumbz .jdlflm').text(),
            slug: $('.detpost .thumb a').attr('href')?.split('/')[4],
            thumbnail: $('.detpost .thumb .thumbz img').attr('src'),
            rating: $('.detpost .epztipe').text().trim(),
            total_episode: $('.detpost .epz').text().trim(),
            latest_release_date: $('.detpost .newnime').text()
        });
    });
    results.splice(-1);

    return results;
};

export { onGoingAnime, completeAnime };
