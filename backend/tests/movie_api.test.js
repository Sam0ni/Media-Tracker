const { test, after, beforeEach, before, describe} = require('node:test')
const assert = require('node:assert')
const helper = require("./movie_test_helper")
const mongoose = require('mongoose')
const nock = require("nock")
const supertest = require('supertest')
const app = require('../app')
const MovieLog = require("../models/movie_log")
const User = require("../models/user")

const api = supertest(app)

describe("single movie endpoint", () => {
    test("single movie is returned as json", async () => {
        nock("https://api.themoviedb.org")
            .get("/3/movie/106")
            .query(true)
            .reply(200, { movie: "test"})

        await api
            .get("/api/movies/106")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("single movie is returned as is from api", async () => {
        nock("https://api.themoviedb.org")
            .get("/3/movie/107")
            .query(true)
            .reply(200, { movie: "test"})

        const res = await api.get("/api/movies/107")

        assert.deepStrictEqual(res.body, { movie: "test"})
    })
})

describe("movie search endpoint", () => {
    test("movie search returns movies as json", async () => {
        nock("https://api.themoviedb.org")
            .get("/3/search/movie")
            .query(true)
            .reply(200, { 1: {movie: "test"}, 2: {movie: "test2"}})

        await api
            .get("/api/movies/search/test")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("movie search returns movies as is from api", async () => {
        nock("https://api.themoviedb.org")
            .get("/3/search/movie")
            .query(true)
            .reply(200, { 1: {movie: "test"}, 2: {movie: "test2"}})

        const res = await api.get("/api/movies/search/test2")

        assert.deepStrictEqual(res.body, { 1: {movie: "test"}, 2: {movie: "test2"} })
    })
})

describe("movie logging", () => {
    let token

    before(async () => {
        await User.deleteMany({});
        await api.post("/api/users").send({username: "test", password: "test"})
        const login = await api.post("/api/login").send({username: "test", password: "test"})
        token = login.body.token
    })

    beforeEach(async () => {
        await MovieLog.deleteMany({})
        await MovieLog.insertMany(helper.initialLogs)
    })

    test("movie logging does not work for logged out user", async () => {
        await api
            .post("/api/movies/log")
            .send({movieId: 106, watched: true})
            .expect(401)

        const logs = await helper.getMovieLogs()

        assert.equal(logs.length, 2)
    })

    test("movie log is added when user has a valid token", async () => {
        await api
            .post("/api/movies/log")
            .send({movieId: 106, watched: true})
            .set("Authorization", `Bearer ${token}`)
            .expect(201)

        const logs = await helper.getMovieLogs()

        assert.equal(logs.length, 3)
    })

    test("movie is logged correctly", async () => {
        const newLog = {movieId: 106, watched: true, watchedAt: '2026-07-03', rating: 5, review: "Arnold's best", ownedFormats: ["physical", "digital"]}

        await api
            .post("/api/movies/log")
            .send(newLog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)

        const logs = await helper.getMovieLogs()
        const log = logs[2]

        const actual = {
            movieId: log.movieId,
            watched: log.watched,
            watchedAt: log.watchedAt.toISOString().slice(0, 10),
            rating: log.rating,
            review: log.review,
            ownedFormats: log.ownedFormats,
        }

        assert.deepStrictEqual(actual, newLog)
    })

    test("movie is not logged if rating is invalid", async () => {
        const newLog = {movieId: 106, watched: true, watchedAt: '2026-07-03', rating: 11, review: "Arnold's best", ownedFormats: ["physical", "digital"]}

        await api
            .post("/api/movies/log")
            .send(newLog)
            .set("Authorization", `Bearer ${token}`)
            .expect(400)

        const logs = await helper.getMovieLogs()

        assert.equal(logs.length, 2)
    })

    test("movie is set watched if rating is provided", async () => {
        const newLog = {movieId: 106, rating: 10}

        await api
            .post("/api/movies/log")
            .send(newLog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)

        const logs = await helper.getMovieLogs()

        const log = logs[2]

        const actual = {
            movieId: log.movieId,
            watched: log.watched,
            rating: log.rating,
        }

        assert.deepStrictEqual(actual, {...newLog, watched: true})
    })

    test("movie is set watched if review is provided", async () => {
        const newLog = {movieId: 106, review: "good movie"}

        await api
            .post("/api/movies/log")
            .send(newLog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)

        const logs = await helper.getMovieLogs()

        const log = logs[2]

        const actual = {
            movieId: log.movieId,
            watched: log.watched,
            review: log.review,
        }

        assert.deepStrictEqual(actual, {...newLog, watched: true})
    })

    test("movie is set watched if watchedAt is provided", async () => {
        const newLog = {movieId: 106, watchedAt: '2026-07-03'}

        await api
            .post("/api/movies/log")
            .send(newLog)
            .set("Authorization", `Bearer ${token}`)
            .expect(201)

        const logs = await helper.getMovieLogs()

        const log = logs[2]

        const actual = {
            movieId: log.movieId,
            watched: log.watched,
            watchedAt: log.watchedAt.toISOString().slice(0, 10),
        }

        assert.deepStrictEqual(actual, {...newLog, watched: true})
    })
})

after(async () => {
  console.log('closing mongoose')
  await mongoose.connection.close()
  console.log('mongoose closed')
})