# 330-sp25-final-project

## Final Project for Q3 of Fullstack JavaScript

### Proposal and Task Breakdown
Your Final Project proposal is due. You should submit a link to a GitHub repository that will house your submission. The project README should contain your project proposal. Your proposal should include:

### 1. A description of your project's context/subject matter (i.e. gaming, project management, image processing, etc.).
My project will be a set of APIs for a comparison shopping tool for IRL grocery shopping. The app itself will help users make smarter shopping decisions.

### 2. A description of what problem your project seeks to solve.
People often feel that one store is more or less expensive than another, without hard data to back it up. Stores will  mark down certain items (like milk or bananas) that consumers tend to notice/remember the price of, to give the perception that their store is less expensive. But is it true? This application will allow users to track real grocery prices in stores to give them a fact-based set of data to compare grocery prices in their geographic area.

### 3. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.

Collections and data model

Users  
-email  
-password  
-roles  

Stores  
-store name  
-store location  
-userId  

Items  
-name  
-description  
-category  
-userId  

Price  
-price  
-size  
-unit price  
-onsale  
-date  
-userId  
-storeId  
-itemId  

Routes  

Users  
POST /users - create a new user  
GET /users - get all users  
GET /uers/:userId/items - get all items for a user  
PUT /users/:userId - update a user  

Stores  
POST /stores - create a store  
GET /stores - get all stores  
GET /stores/:storeId/items - get all items for a store  
PUT /stores/:storeId - update a store  

Items  
POST /items - create an item  
GET /items - get all items  
GET /items/:itemId - get a specific item  
GET /items/:itemId/cheapest  
GET /items/:itemId/priciest  
GET /items/:itemId/mean  
PUT /items/:itemId - update a specific item  

Prices  
POST /prices - create a new price  
GET /prices - get all prices  
GET /prices/:priceId - get a specific price  
PUT /items/:priceId - update a price  

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