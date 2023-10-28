## Basic walk-through of Front End App ##
### Pages available ###
    * / Main Page
        * You can pick up a user to authorize with it.
        * Halft of the users are clients who has contracts for some job.
        * Another half of users are contractors that are working on client's jobs.
    * / dashboard 
        * After picking up a user, you are redirected to dashboard.
        * On dashboard you see two tables. 
            * The first one is for Contracts signed between client and contractor.
            * The second table shows Jobs that should be done according to the contract.
        * There is a Deposit button in Contracts table which allows only clients to deposit money to contractor.
        * There is a Pay button which allows clients to pay the price of the job to contractors.
    * / admin 
        * On admin page There are two type of cards
            * First shows top payed profession
            * Second shows clients with top costs + you have kind of pagination as well.
    * / profile 
        * On profile page you can see your profile info
        * You have button to log out
## Features implemented in API ##
- Request validation
    - Request validation was needed only at one place but it's a good example how I'm handling validation of request with express-validator package
- API versioning
    - It's good practice to created the structure which supports versioning, it's easy structure to pick up and handy when updating api endpoints
- MVC
    - Generally most of Express apps are using MVC pattern and I also like it so I'm almost always using it in my projects
- Constant response structure pattern
    - When working on Front End, it's really disturbing when all api endpoints are returning different structure of json. That's the reason why I'm handling it globally with simple helper function, so there will always be same structure in response json. 
- Middleware
    - There are two middlewares in project. For now the same middleware function is used for admins and ordinar users, In real life examples they differe from each other.
- Transactions
    - For operations that includes money transfers, it's crucial to use transactions. To be sure that if something failes, everything will be rollbacked
- Public asset management
    - It's super cool when you can have multiple projects in the same app. I decided to leverage with that opportunity and hosted Front End app from api, so it'll be easier to play with it.

## Features implemented in Front End app ##

The Front End app itself is not big, it only has four pages (profile, home, dashboard and admin) but I tried to use as many best practices as it's possible in such project. So the features are:
- User authorization
    - It's funny authorization, I'm using userIds instead of JWT tokens. The behaviour is almost same, it's just easier and quicker to use userIds.
- Context API
    - In most of my projects I was using Redux but here I decided to use Context API, it's built in, clean, logical and nice looking
- Custom hooks
    - Alongside of context providers I created several custom hooks, it's really handy using such utilities to avoid code duplication and keep the jsx separated from actual logic.
- Global feedback (error/success/warning) management
    - When using state management tools, it's super easy to setup global error management, also it's really handy after setting up everything. You can call the function from anywhere and the feedback popup will apear.
- TypeScript
    - I love TypeScript, it's giving confidence and clearance to the code
- Routing with react-router-dom
- Story Book
    - Using story book is really good practice. It helps you to understand how does your components look.
- robots.txt
    - If you need to setup configuration for crawlers, you should do it in robots.txt file
- public dir
    - For fonts and images the best place to live is public dir.
- Custom font
    - To load custom font you can import it in index.html and declare fontFace in global CSS file

## How to guide ##
- Prerequisites
    - You should have NodeJS installed on your device. Preferably version 18 or newer.
- Instalation
    - You should navigate to root directory and run -> npm run install:both 
        - The script installs dependencies in both Front End and API projects. You might need to wait for couple of minutes, so you have some time to grab coffe :)
- Seeding
    - You should run npm run seed
        - It will seed local sqlite database which is using file system as a source.
- How to start
    - You should navigate to root directory and run -> npm start
        - The script will build Front End app, after starts API and you will be able to visit website on 3001 port. 

That's all, enjoy with your coffe and the website. Don't judge me because of styling, it's on ChatGPT :D
Some day I'll add unit tests hopefully, first of all I need to find time and motivation for it :)

    