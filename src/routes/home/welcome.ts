import { Hono } from "hono";

const welcomeRoute = new Hono();

welcomeRoute.get('*', (c) => {
    return c.json({
        message: "Welcome to UnOfficial Otakudesu API",
        documentation: "https://github.com/ariear/otakudesu-api"
    });
});

export default welcomeRoute;
