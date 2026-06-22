const { test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const helper = require("./movie_test_helper")
const mongoose = require('mongoose')
const nock = require("nock")
const supertest = require('supertest')
const app = require('../app')
const MovieLog = require("../models/movie_log")

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
    beforeEach(async () => {
        await MovieLog.deleteMany({})
        await MovieLog.insertMany(helper.initialLogs)
    })

    test("movie logging does not work for logged out user", async () => {
        await api
            .post("/api/movies/log")
            .expect(401)

        const logs = await helper.getMovieLogs()

        assert.equal(logs.length, 2)
    })
})

after(async () => {
  console.log('closing mongoose')
  await mongoose.connection.close()
  console.log('mongoose closed')
})