import { Hono } from "hono";
import { cors } from 'hono/cors'
import homeRoute from "./home";
import animeListRoute from "./anime_list";
import animeRoute from "./anime";

export const routes = (app: Hono) => {
    app.use('/api/*', cors());

    app.route('/api/home', homeRoute);
    app.route('/api/anime-list', animeListRoute);
    app.route('/api/anime', animeRoute);
};
