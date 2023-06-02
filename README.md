# AngularRecipeApp
A responsive single page application built with Angular, allowing users to browse, create, edit, and manage lists of cooking recipes.

Here you can find the **[REST API](https://github.com/rpashev/recipes-REST-express)** that I have created for the app.  

> Live demo **[HERE](https://my-recipes-rp.netlify.app/)**

## Table of Contents
* [General Info](#general-information)
* [Challenges](#challenges)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
An Angular application, built for a course I was taking at Software University in the end of 2022. This was my second personal project written in Angular and it served for confirming and expanding my knowledge of the framework. I also created a REST API for this app, built with Node/Express. 


## Challenges
- Angular Material was surprisingly limiting in its capabilities
- Splitting the app into modules in an optimal manner
- RxJS's learning curve is steep and understanding the different operators is a challenge
- TypeScript's is great but sometimes it's a fight with the compiler
- Thinking of design ideas is often challenging


## Technologies Used  

### Front End
- Angular 15
- Angular Material
- RxJS
- TypeScript
- SASS/SCSS

  
 ### Back End
 - Node
 - Express 
 - MongoDB
 - Mongo Atlas
 - Mongoose
 - JWT
 - Axios


## Features
### Anonymous users are able to:
- browse recipes on the homepage
- visit the recipe details page
- register
- login

### Authenticated users are able to:
- user can browse recipes on the homepage
- user can visit the recipe details page
- user can add a recipe
- user can edit his recipes
- user can delete his recipes
- user can view his own recipes
- user can add a recipe to favorites
- user can remove a recipe from favorites
- user can view his favorite recipes
- user can logout


## Setup
### To get a local copy up and running follow these simple steps:

1. Make sure you have **`node`** and **`npm`** installed globally on your machine.  

2. Clone the repo  
    ### `git clone https://github.com/rpashev/angular-recipe-app.git`  

3. Install NPM packages  
    ### `npm install`    
  
4. Run the app in development mode with hot reloading  
    ### `ng serve`  

5. You can view the app on [http://localhost:4200](http://localhost:4200)  
 
6. To build for production run the following command  
    ### `ng build`

7. If you want to connect to the backend follow the instructions [here](https://github.com/rpashev/recipes-REST-express/#readme)


## Room for Improvement
- pagination - both on frontend and backend
- better design in terms of UI
- add a rating feature
- add a review feature
- predefined tags as options/checkboxes instead of entered as text inputs
- more complex ingredient input
- recipe directions provided in steps
- filters for recipes based on tags, rating, date created, etc.
- implement an "Auto Logout" functionality on JWT expiration
- improve user feedback
- break up some of the bigger components into smaller ones


## Contact
Created by rpashev - feel free to [contact me](https://www.rpashev.com/).

