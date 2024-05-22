# lacuna-vtt

The Lacuna VTT project aims to provide the gaming community with:

- An open-source, self-hosted Virtual Tabletop
- An extensible platform that can be tailored to the needs of individual games
- Support for mobile-first, third-party, and other non-desktop clients

The project intends to use the [Nakama](https://heroiclabs.com/nakama/) game server on the backend, with a default React frontend. Reusable React components will be available for individual game developers.

## Service

The service is bundled as a docker-compose file. To start the service, run `docker compose up` from the root directory.

The console port is 7351, so you can view the console at http://server:7351

The `data/lacuna-config.yml` file contains the admin username and password, along with environment-specific stuff like client IDs for social signon.