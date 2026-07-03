const { test, after, beforeEach, before, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require("../models/user")

const api = supertest(app)

describe("user creation", () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test("a user can be created", async () => {
        await api
                .post("/api/users")
                .send({username: "test", password: "test"})
                .expect(201)
        
        const users = await User.find({})

        assert.equal(users.length, 1)
    })
})

describe("logging in", () => {
    before(async () => {
        await User.deleteMany({})
        await api.post("/api/users").send({username: "test", password: "test"})
    })

    test("login works with correct credentials", async () => {
        await api
                .post("/api/login")
                .send({username: "test", password: "test"})
                .expect(200)
    })

    test("login returns a token and username with correct credentials", async () => {
        const res = await api
                .post("/api/login")
                .send({username: "test", password: "test"})
                .expect(200)
        
        assert.equal(res.body.username, "test")
        assert.ok(res.body.token.length > 0)
        
    })
})

after(async () => {
  console.log('closing mongoose')
  await mongoose.connection.close()
  console.log('mongoose closed')
})