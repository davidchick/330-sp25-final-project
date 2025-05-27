const request = require("supertest");
var jwt = require("jsonwebtoken");

const server = require("../../server");
const testUtils = require("../../test-utils");

const User = require("../../models/user");
const Item = require("../../models/item");

describe("/items", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const item0 = { name: "Carrots", description: "Organic", category: "Produce" };
    const item1 = { name: "Frozen Peas", description: "Jolly Green Giant, 16oz.", category: "Produce" };

    describe("Before login", () => {
        describe("POST /", () => {
            it("should send 401 without a token", async () => {
                const res = await request(server).post("/items").send(item0);
                expect(res.statusCode).toEqual(401);
            });

            it("should send 401 with a bad token", async () => {
                const res = await request(server)
                    .post("/items")
                    .set("Authorization", "Bearer BAD")
                    .send(item0);
                expect(res.statusCode).toEqual(401);
            });
        });

        describe("GET /", () => {
            it("should send 401 without a token", async () => {
                const res = await request(server).get("/items").send(item0);
                expect(res.statusCode).toEqual(401);
            });

            it("should send 401 with a bad token", async () => {
                const res = await request(server)
                    .get("/items")
                    .set("Authorization", "Bearer BAD")
                    .send();
                expect(res.statusCode).toEqual(401);
            });
        });

        describe("GET /:id", () => {
            it("should send 401 without a token", async () => {
                const res = await request(server).get("/items/123").send(item0);
                expect(res.statusCode).toEqual(401);
            });

            it("should send 401 with a bad token", async () => {
                const res = await request(server)
                    .get("/items/456")
                    .set("Authorization", "Bearer BAD")
                    .send();
                expect(res.statusCode).toEqual(401);
            });
        });

    });

    describe("after login", () => {
        const user0 = {
            email: "user0@mail.com",
            password: "123password",
        };
        const user1 = {
            email: "user1@mail.com",
            password: "456password",
        };

        let token0;
        let adminToken;

        let user0Id;

        beforeEach(async () => {
            await request(server).post("/auth/signup").send(user0);
            const res0 = await request(server).post("/auth/login").send(user0);
            adminToken = res0.body.token;
            await request(server).post("/auth/signup").send(user1);
            // await User.updateOne(
            //     { email: user1.email },
            //     { $push: { roles: "admin" } }
            // );
            const res1 = await request(server).post("/auth/login").send(user1);
            token0 = res1.body.token;
        });

        describe.each([item0, item1])("POST / item %#", (item) => {
            it("should send 403 to normal user and not store item", async () => {
                const res = await request(server)
                    .post("/items")
                    .set("Authorization", "Bearer " + token0)
                    .send(item);
                expect(res.statusCode).toEqual(403);
                expect(await Item.countDocuments()).toEqual(0);
            });

            it("should send 200 to admin user and store item", async () => {
                const res = await request(server)
                    .post("/items")
                    .set("Authorization", "Bearer " + adminToken)
                    .send(item);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(item);
                const savedItem = await Item.findOne({ _id: res.body._id }).lean();
                expect(savedItem).toMatchObject(item);
            });
        });

        describe.each([item0, item1])("PUT / item %#", (item) => {
            let originalItem;

            beforeEach(async () => {
                const res = await request(server)
                    .post("/items")
                    .set("Authorization", "Bearer " + adminToken)
                    .send(item);
                originalItem = res.body;
            });

            it("should send 403 to normal user and not update item", async () => {
                const res = await request(server)
                    .put("/items/" + originalItem._id)
                    .set("Authorization", "Bearer " + token0)
                    .send({ ...item, category: 'Sporting Goods' });
                expect(res.statusCode).toEqual(403);
                const newItem = await Item.findById(originalItem._id).lean();
                newItem._id = newItem._id.toString();
                newItem.userId = newItem.userId.toString();
                expect(newItem).toMatchObject(originalItem);
            });

            it("should send 200 to admin user and update item", async () => {
                const res = await request(server)
                    .put("/items/" + originalItem._id)
                    .set("Authorization", "Bearer " + adminToken)
                    .send({ ...item, category: 'Sporting Goods' });
                expect(res.statusCode).toEqual(200);
                const newItem = await Item.findById(originalItem._id).lean();
                newItem._id = newItem._id.toString();
                newItem.userId = newItem.userId.toString();
                expect(newItem).toMatchObject({
                    ...originalItem,
                    category: 'Sporting Goods',
                });
            });

        });

        describe.each([item0, item1])("GET /:id item %#", (item) => {
            let originalItem;
            beforeEach(async () => {
                const res = await request(server)
                    .post("/items")
                    .set("Authorization", "Bearer " + adminToken)
                    .send(item);
                originalItem = res.body;
            });

            it("should send 200 to normal user and return item", async () => {
                const res = await request(server)
                    .get("/items/" + originalItem._id)
                    .set("Authorization", "Bearer " + token0)
                    .send();
                expect(res.statusCode).toEqual(200);
                const fixedUser = res.body;
                fixedUser.userId = fixedUser.userId._id.toString();
                expect(res.body).toMatchObject(originalItem);
            });

            it("should send 200 to admin user and return item", async () => {
                const res = await request(server)
                    .get("/items/" + originalItem._id)
                    .set("Authorization", "Bearer " + adminToken)
                    .send();
                expect(res.statusCode).toEqual(200);
                const fixedUser = res.body;
                fixedUser.userId = fixedUser.userId._id.toString();
                expect(res.body).toMatchObject(originalItem);
            });
        });

        // describe("GET /", () => {
        //     let items;

        //     beforeEach(async () => {
        //         items = (await Item.insertMany([item0, item1])).map((i) => i.toJSON());
        //         items.forEach((i) => (i._id = i._id.toString()));
        //     });

        //     it("should send 200 to normal user and return all items", async () => {
        //         const res = await request(server)
        //             .get("/items/")
        //             .set("Authorization", "Bearer " + token0)
        //             .send();
        //         expect(res.statusCode).toEqual(200);
        //         expect(res.body).toMatchObject(items);
        //     });

        //     it("should send 200 to admin user and return all items", async () => {
        //         const res = await request(server)
        //             .get("/items/")
        //             .set("Authorization", "Bearer " + adminToken)
        //             .send();
        //         expect(res.statusCode).toEqual(200);
        //         expect(res.body).toMatchObject(items);

        //     });

        });
    });



