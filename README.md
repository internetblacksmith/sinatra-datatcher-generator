# Sinatra Datatcher Generator

## Getting Started

### About
This Generator is born with the frontend developer without any backend knowledge in mind, in fact, it will create a very basic data catcher with a basic the backend logic and a blank frontend ready to edit and make it beautiful.
It is born with one main concept __easy to use__ and following this concept once ran it will create a web app "production ready" meaning that the result is ready to be pushed without any modification.


### Prerequisite
The only mandatory prerequisites obviously are __Yoeman__, __NPM__ and a basic knowledge of command line tool, but for a better experience is recommended to have a Postgres server, Ruby, bundler gem a Heroku account with the toolbelt installed.
Postgres server, Ruby and the bundler gem are needed for testing the app on your local machine.

### Workflow
My intended workflow is something like:

* start the generator 
*     $ yo sinatra-datatcher

* follow the instruction on the screen
* create the local database

*     $ rake db:create

* create the needed table
*     $ rake db:migrate
* start the Sinatra app
*     $ sinatra app.rb
* edit the pages as needed
* create a new git repository in your project and commit all the files
* create a new Heroku app with the toolbelt
*     $ heroku create <app-name>
* push the app to heroku
*     $ git push heroku master
* check the result and fell good with yourself ;)

## The web app
The web app is composed of 4 pages:
* home (with the form)
* thank you (where the user is redirected after the data is saved)
* error (where the user is redirected in case of error saving the data)
* admin (the admin page where all the collected data is displayed, by default is password protected Username: admin, Password: admin)

each page has its own view and they share the common layout and to make the dev a little simpler, each page has its own route so: "/", "/thankyou", "/error", "/admin"

to change the admin page username and password __RECCOMENDED__ edit this line:

    @auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == ['admin', 'admin']

replacing the credential at the end of the line
