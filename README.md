# Evernote Clone
[Live Link](https://better-note.herokuapp.com/)

<!-- ABOUT THE PROJECT -->

## About the Evernote Clone

![Evernote-Clone](/README-Resources/splashpage.png "Evernote Clone")
![Evernote-Clone](/README-Resources/homepage.png "Evernote Clone")

This Evernote clone is a fullstack PERN application using React/Redux for the frontend, and Express/PostgresSQL for the backend. This app allows users to create, delete, or associate notes with notebooks and/or tags. Users also have the ability to edit their notes, notebooks, and tags as long as the changes pass validations listed on the backend.

<!-- Getting Started -->
## Setup

1) Clone this repository 'https://github.com/sungminlee417/Evernote-Clone.git'
2) Run `npm install` in both the backend and frontend to install necessary dependencies
3) In the backend folder,
 - Create an `.env` file following the example to set up your local environement variables
 - Setup the database by running `dotenv npx sequelize db:migrate` and `dotenv npx sequelize db:seed:all`
4) Run `npm start` in both the backend and frontend 
