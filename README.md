# Media Tracker

This is a project for University of Helsinki course Full Stack Open.

The purpose of Media Tracker is to keep tabs on various medias such as music, films, tv-series, anime, etc. This definition will be updated as the app progresses.

---

## Testing

The backend tests can be run with the following command in the backend folder root:

```
docker compose run --rm backend npm test
```

Please note that the command will only remove the backend container. The network and mongo container will stay up until running

```
docker compose down
```