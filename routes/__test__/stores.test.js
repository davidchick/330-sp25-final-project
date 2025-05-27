const request = require("supertest");
var jwt = require("jsonwebtoken");

const server = require("../../server");
const testUtils = require("../../test-utils");

// const User = require("../../models/user");
// const Item = require("../../models/store");

describe("/stores", () => {

    beforeAll(testUtils.connectDB);
    afterAll(testUtils.clearDB);
    afterAll(testUtils.stopDB);

    const sampleStores = [
        { name: 'SuperStore', location: 'New York, NY' },
        { name: 'Store Number Two', location: 'Boston, Mass' },
        { name: 'Corner Store', location: 'Ballard, WA' }
    ];

    const sampleUsers = [
        { email: "bob@bob.edu", password: "123abc" },
        { email: "don@gmail.com", password: "456xyz" },
        { email: "frank@valley.org", password: "123abc" }
    ];


    describe("before login", () => {
        it("should send 401 without a token", async () => {
            const res = await request(server).post("/stores").send(sampleStores[0]);
            expect(res.statusCode).toEqual(401);
        });
    });


    describe("after login", () => {

        let userId0;
        let token0;
        let userId1;
        let token1;
        let userId2;
        let token2;

        let storeNumber = 0;

        //create users
        beforeAll(async () => {
            const resSignUp0 = await request(server).post("/auth/signup").send(sampleUsers[0]);
            userId0 = resSignUp0.body._id;
            const resLogin0 = await request(server).post("/auth/login").send(sampleUsers[0]);
            token0 = resLogin0.body.token;

            const resSignUp1 = await request(server).post("/auth/signup").send(sampleUsers[1]);
            userId1 = resSignUp1.body._id;
            const resLogin1 = await request(server).post("/auth/login").send(sampleUsers[1]);
            token1 = resLogin1.body.token;

            const resSignUp2 = await request(server).post("/auth/signup").send(sampleUsers[2]);
            userId2 = resSignUp2.body._id;
            const resLogin2 = await request(server).post("/auth/login").send(sampleUsers[2]);
            token2 = resLogin2.body.token;

        });


        describe.each(sampleStores)("POST / store %#", (store) => {

            it("should send 403 to normal user and not store item", async () => {
                const res = await request(server)
                    .post("/stores")
                    .set("Authorization", "Bearer " + token1)
                    .send(store);
                expect(res.statusCode).toEqual(403);
            });

            it("should send 200 to admin user and store item", async () => {
                const res = await request(server)
                    .post("/stores")
                    .set("Authorization", "Bearer " + token0)
                    .send(store);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(store);

                sampleStores[storeNumber]._id = res.body._id;
                storeNumber++;
            });

        });

        describe("GET / all stores", () => {
            it("should get all stores", async () => {
                const res = await request(server)
                    .get("/stores")
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(sampleStores);
            });
        });

        describe.each(sampleStores)("GET / store %#", (store) => {
            it("should get a stores", async () => {
                const res = await request(server)
                    .get("/stores/" + store._id)
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(store);
            });
        });

        describe("DELETE / store", () => {

            it("should delete a store", async () => {
                const res = await request(server)
                    .delete("/stores/" + sampleStores[2]._id)
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res.statusCode).toEqual(200);

                const res1 = await request(server)
                    .get("/stores")
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res1.statusCode).toEqual(200);
                expect(res1.body).toHaveLength(2);

            });

        });

    });

});
