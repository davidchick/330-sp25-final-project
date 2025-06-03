# 330-sp25-final-project

## Final Project for Q3 of Fullstack JavaScript

### Final Project Self Evaluation, June 3rd

I found it challenging to just fulfil the basic requirements of the final project, so I didn't venture too far beyond what we covered in class. I was worried (rightly) that any added complexity would multiply the effort when it came to tests, UI, etc. 

I plumbed in the basic DAOSs, models, and CRUD routes fairly early on. By the time I got the unit tests in and working, I was a little tired of my concept, which seemed a little too basic. I decided at that point to slap a UI on it, even though that wasn't required.

After messing around with mustache for a bit, I decided to take the plunge and do a full React front end. A couple of observations:
* It was very satisfying to come full circle with what we've learned over the year with a react front end and and express backend.
* At the same time, I was saddened to see how quickly I had forgotten 90% of React.
* Building out the UI was very helpful in refining my API design. It really helped me focus on what I needed to deliver to the front end, and made me question and refine a lot of my early API design.
* Putting in the front end, while tedious, re-invigorated my enthusiasm for my overall concept.

My tests are passing with 82% coverage, but there is certainly a lot more I could do in the way of tests. 

My UI is vary basic raw HTML, if I had more time I'd probably explore Material UI or another package for easy UI polish.

Mongo aggregations are tricky.

I thought wiring up Mongodb Atlas and Railway was going to ba a lot harder than it was.

Overall, I'm very happy with my end result, and I think my approach was pretty solid. Once I had the basic plumbing and CRUD routes in, it was pretty easy to expand on them and add new features. In future, I think I would sketch out the final UI first, and try to design the APIs around what would be needed to fulfil the UI, if that was the nature of the project.

### Tests

dchick@Davids-MacBook-Air 330-sp25-final-project % npm run test:coverage

> 330-sp25-final-project@1.0.0 test:coverage
> jest --runInBand --coverage

 PASS  routes/__test__/items.test.js
 PASS  routes/__test__/auth.test.js
 PASS  routes/__test__/prices.test.js
 PASS  routes/__test__/stores.test.js
-------------------------------|---------|----------|---------|---------|-------------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s       
-------------------------------|---------|----------|---------|---------|-------------------------
All files                      |   81.55 |    75.86 |   70.49 |   81.44 |                         
 330-sp25-final-project        |     100 |      100 |     100 |     100 |                         
  server.js                    |     100 |      100 |     100 |     100 |                         
  test-utils.js                |     100 |      100 |     100 |     100 |                         
 330-sp25-final-project/daos   |   74.52 |      100 |      60 |   74.52 |                         
  auth.js                      |   72.09 |      100 |   57.14 |   72.09 | 12,28,44,54,59-63,68-72 
  items.js                     |   65.21 |      100 |   42.85 |   65.21 | 11,16,24,65,94-98       
  prices.js                    |   84.21 |      100 |      80 |   84.21 | 11,24,32                
  stores.js                    |   80.95 |      100 |   66.66 |   80.95 | 11,24,58,66             
 330-sp25-final-project/models |     100 |      100 |     100 |     100 |                         
  item.js                      |     100 |      100 |     100 |     100 |                         
  price.js                     |     100 |      100 |     100 |     100 |                         
  store.js                     |     100 |      100 |     100 |     100 |                         
  user.js                      |     100 |      100 |     100 |     100 |                         
 330-sp25-final-project/routes |   82.03 |    73.07 |   74.19 |   82.03 |                         
  auth.js                      |   82.75 |    79.16 |   85.71 |   82.75 | 27,49,78,88-89,95-100   
  index.js                     |     100 |      100 |     100 |     100 |                         
  items.js                     |   72.54 |       50 |   55.55 |   72.54 | 33-35,40-44,56-57,79-84 
  prices.js                    |   88.37 |       75 |   85.71 |   88.37 | 18,57-59,66             
  stores.js                    |    82.6 |       80 |      75 |    82.6 | 18,46-48,63-65,72       
-------------------------------|---------|----------|---------|---------|-------------------------

Test Suites: 4 passed, 4 total
Tests:       65 passed, 65 total
Snapshots:   0 total
Time:        1.74 s
Ran all test suites.


### Project Update, May 21st

#### Done
* project is set up and running
* express, mongo, supertest, git are all installed and configured
* production instance is working with Mongodb Atlas and Railway, auto publishing from github: https://330-sp25-final-project-production.up.railway.app 
* basic CRUD routes for Auth, Stores, Items, and Prices are all in place and working
* testing is working and a few auth tests are running
* postman collection is set up for demo

#### To Do
* implement some more interesting routes: highest/lowest prices, etc., using lookups.
* indexes
* text search (maybe)
* write a lot more tests
* mustache or other UI?

#### Sample Routes
* sign-up POST https://330-sp25-final-project-production.up.railway.app/auth/signup
* login: POST https://330-sp25-final-project-production.up.railway.app/auth/login
* get stores: GET https://330-sp25-final-project-production.up.railway.app/stores

------

### Production Instance
https://330-sp25-final-project-production.up.railway.app  

### Proposal and Task Breakdown
*Your Final Project proposal is due. You should submit a link to a GitHub repository that will house your submission. The project README should contain your project proposal. Your proposal should include:*

### 1. A description of your project's context/subject matter (i.e. gaming, project management, image processing, etc.).
My project will be a set of APIs for a comparison shopping tool for IRL grocery shopping. The app itself will help users make smarter shopping decisions by letting them log real-world grocery prices, and return comparison data from stores in their area.

### 2. A description of what problem your project seeks to solve.
People often feel that one store is more or less expensive than another, without hard data to back it up. Stores will  mark down certain items (like milk or bananas) that consumers tend to notice/remember the price of, to give the perception that their store is less expensive. But is it true? This application will allow users to track and compare real grocery prices in stores to give them a fact-based set of data to evaluate grocery stores in their geographic area.

### 3. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.

#### Collections and data model

Users  
-email  
-password  
-roles  

Stores  
-name  
-location  
-userId  

Items  
-name  
-description  
-category  
-userId  

Price  
-price  
-onsale  
-date  
-userId  
-storeId  
-itemId  

#### Routes  

Users  
POST /users - create a new user  
GET /users - get all users  
GET /uers/:userId/items - get all items for a user  
PUT /users/:userId - update a user   
DELETE /users/delete/:userId - delete a user  

Stores  
POST /stores - create a store  
GET /stores - get all stores  
GET /stores/:storeId/items - get all items for a store  
PUT /stores/:storeId - update a store  
DELETE /stores/delete/:storeId - delete a store   

Items  
POST /items - create an item  
GET /items - get all items  
GET /items/:itemId - get a specific item  
PUT /items/:itemId - update a specific item  
DELETE /items/delete/:itemId - delete an item   

Prices  
POST /prices - create a new price  
GET /prices - get all prices  
GET /prices/:priceId - get a specific price  
PUT /prices/:priceId - update a price   
DELETE /prices/delete/:priceId - delete a price  

### 4. Clear and direct call-outs of how you will meet the various project requirements.

- This will be an express application with a Mongo db backend.
- There will be authentication and authorization. Only authenticated users will be able to add or update data.
- Roles will include shopper and admin. Shopper will be able to create & update stores, items, and prices. Admin will be able to administer users.
- There will be CRUD routes for users, stores, items, and prices.
- There will be indexes on applicable fields like item name and description.
- There will be lookup and aggregation to return cheapest, most expensive, and mean prices for items.

### 5. A timeline for what project components you plan to complete, week by week, for the remainder of the class. 

Week 6  
Basic set-up. Files/directory structure. Github. All necessary dependencie installed and verified working, including bcrypt, jwt tokens, testing, dotenv, mongodb.  

Week 7  
Writing tests and coding.  

Week 8  
Writing tests and coding. Indexes. Lookup and aggregation. Configure Postman collection.  

Week 9  
Testing, tweaking, catalog enhancements and changes. Deployment.  