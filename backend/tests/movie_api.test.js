const { test, after } = require('node:test')
const mongoose = require('mongoose')
const nock = require("nock")
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test("movies are returned as json", async () => {
    nock("https://api.themoviedb.org")
        .get("/3/movie/106")
        .query(true)
        .reply(200, { movie: "test"})

    await api
        .get("/api/movies/106")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

after(async () => {
  console.log('closing mongoose')
  await mongoose.connection.close()
  console.log('mongoose closed')
})