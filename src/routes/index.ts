import { Hono } from "hono";
import { cors } from 'hono/cors'
import homeRoute from "./home";
import animeListRoute from "./anime_list";
import animeRoute from "./anime";
import releaseScheduleRoute from "./release_schedule";
import genreRoute from "./genre_list";
import ongoingRoute from "./ongoing";
import completeRoute from "./complete";
import welcomeRoute from "./home/welcome";

export const routes = (app: Hono) => {
    app.use('/api/*', cors());

    app.route('/api/home', homeRoute);
    app.route('/api/anime-list', animeListRoute);
    app.route('/api/anime', animeRoute);
    app.route('/api/release-schedule', releaseScheduleRoute);
    app.route('/api/genre-list', genreRoute);
    app.route('/api/ongoing-anime', ongoingRoute);
    app.route('/api/complete-anime', completeRoute);
    app.route('/', welcomeRoute);
};
