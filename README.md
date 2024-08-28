# UnOfficial Otakudesu API 👀🔥
---
<p align="center">
<img src="https://otakudesu.cloud/wp-content/uploads/2019/08/otakudesu.png" align="center" />
</p>
<p align="center">
 <b>I made this API using the technologies below</b>
</p>
<p align="center">
<div style="display: flex;" align="center">
<a href="https://hono.dev/?kawaii=true"><img src="https://hono.dev/images/logo-small.png" width="60px" /></a>
<a href="https://cheerio.js.org/"><img src="https://cheerio.js.org/img/orange-c.svg" width="60px" /></a>
</div>
</p>

---

An unofficial API from otakudesu. I made this API using the scrapping method with the help of the cheerio library. Hopefully it can help you to develop anime streaming applications 😉.

---

- [UnOfficial Otakudesu API 👀🔥](#unffficial-otakudesu-api-)
  - [Documentation](#documentation)
  - [Installation](#installation)
  - [Let's Contribute](#lets-contribute)


## Documentation

### Param
| Param | Example | Description |
|-------|-------|-------|
| `:page` | `1` | Is the number for pagination |
| `:slug` | `kusuriya-hitorigoto-sub-indo` `knh-batch-sub-indo` | Is the slug of the title and batch download of the anime |
| `:eps` | `knh-episode-1-sub-indo` | Is a slug for an anime episode |
| `?q` | `yahaha` | It is a parameter to search for anime by title |

### Endpoint
| Endpoint | Method | Example | Description |
|----------|-------|-------|-------|
| `/api/home` | GET | `/api/home` | Get a list of ongoing and finished anime |
| `/api/anime-list` | GET | `/api/anime-list` | Get all anime in alphabetical order |
| `/api/anime/:slug` | GET | `/api/anime/kusuriya-hitorigoto-sub-indo` | Get anime details |
| `/api/anime/episode/:eps` | GET | `/api/anime/episode/knh-episode-1-sub-indo` | Get episode details of anime, it contains streaming and download links of anime |
| `/api/anime/batch/:slug` | GET | `/api/anime/batch/knh-batch-sub-indo` | Get link to download anime batch |
| `/api/anime/search` | GET | `/api/anime/search?q=yahahah` | Search anime by title |
| `/api/release-schedule` | GET | `/api/release-schedule` | Get anime release schedule |
| `/api/genre-list` | GET | `/api/genre-list` | Get genre list |
| `/api/ongoing-anime` | GET | `/api/ongoing-anime` | Get a list of ongoing anime |
| `/api/complete-anime` | GET | `/api/complete-anime` | Get a list of finished anime |

## Installation

You can use the docker image below

[![DockerImage](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/arieakbarull/otakudesu-api)

#### OR

Clone this repo

```sh
git clone https://github.com/ariear/otakudesu-api.git
```

Install the depedencies

```sh
bun install
```

create `.env` file and fill in `OTAKUDESU_URL=https://otakudesu.cloud`.

Run server

```sh
bun dev
```

## Let's Contribute
You can contribute to this project by creating a pull request or issue.
