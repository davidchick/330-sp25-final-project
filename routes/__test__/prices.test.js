const request = require("supertest");
var jwt = require("jsonwebtoken");

const server = require("../../server");
const testUtils = require("../../test-utils");

let testDate = '2025-05-27T19:50:38.263Z';

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

    const sampleItems = [
        { name: "Broccoli", description: "Organic", category: "Produce" },
        { name: "Bread", description: "Sliced Como Loaf", category: "Bread" },
        { name: "Milk", description: "Gallon, Organic", category: "Dairy" }
    ];



    const samplePrices = [
        { price: 7.99, onsale: false },
        { price: 6.66, onsale: false },
        { price: 1.00, onsale: true },
    ];



    describe("before login", () => {
        it("should send 401 without a token", async () => {
            const res = await request(server).post("/prices").send(samplePrices[0]);
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

        let priceNumber = 0;


        beforeAll(async () => {

            //create users
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

            // create stores
            const resStore0 = await request(server)
                .post("/stores")
                .set("Authorization", "Bearer " + token0)
                .send(sampleStores[0]);
            sampleStores[0]._id = resStore0.body._id;
            samplePrices[0].storeId = resStore0.body._id;
            const resStore1 = await request(server)
                .post("/stores")
                .set("Authorization", "Bearer " + token0)
                .send(sampleStores[1]);
            sampleStores[1]._id = resStore1.body._id;
            samplePrices[1].storeId = resStore1.body._id;
            const resStore2 = await request(server)
                .post("/stores")
                .set("Authorization", "Bearer " + token0)
                .send(sampleStores[2]);
            sampleStores[2]._id = resStore2.body._id;
            samplePrices[2].storeId = resStore2.body._id;
            //console.log(sampleStores);

            // create items
            const resItem0 = await request(server)
                .post("/items")
                .set("Authorization", "Bearer " + token0)
                .send(sampleItems[0]);
            sampleItems[0]._id = resItem0.body._id;
            samplePrices[0].itemId = resItem0.body._id;
            const resItem1 = await request(server)
                .post("/items")
                .set("Authorization", "Bearer " + token0)
                .send(sampleItems[1]);
            sampleItems[1]._id = resItem1.body._id;
            samplePrices[1].itemId = resItem1.body._id;
            const resItem2 = await request(server)
                .post("/items")
                .set("Authorization", "Bearer " + token0)
                .send(sampleItems[2]);
            sampleItems[2]._id = resItem2.body._id;
            samplePrices[2].itemId = resItem1.body._id;
            //console.log(samplePrices);

        });



        describe.each(samplePrices)("POST / price %#", (price) => {

            it("should send 403 to normal user and not store price", async () => {
                const res = await request(server)
                    .post("/prices")
                    .set("Authorization", "Bearer " + token1)
                    .send(price);
                expect(res.statusCode).toEqual(403);
            });

            it("should send 200 to admin user and store price", async () => {
                const res = await request(server)
                    .post("/prices")
                    .set("Authorization", "Bearer " + token0)
                    .send(price);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(price);

                samplePrices[priceNumber]._id = res.body._id;
                priceNumber++;
            });

        });

        describe("GET / all prices", () => {
            it("should get all prices", async () => {
                const res = await request(server)
                    .get("/prices")
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(3);
            });
        });

        describe.each(samplePrices)("GET / price %#", (price) => {
            it("should get a price", async () => {
                const res = await request(server)
                    .get("/prices/" + price._id)
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(price);
            });
        });

        describe("DELETE / price", () => {

            it("should delete a price", async () => {
                const res = await request(server)
                    .delete("/prices/" + samplePrices[2]._id)
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res.statusCode).toEqual(200);

                const res1 = await request(server)
                    .get("/prices")
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res1.statusCode).toEqual(200);
                expect(res1.body).toHaveLength(2);

            });

        });

    });

});
