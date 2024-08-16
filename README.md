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
| `/api/home` | GET | `/api/home` | Returns on-going and latest complete anime |

## Installation

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
