# Calculator
Input two numbers and select the type of mathematical operation. 
Displays and updates the Calculations table as new calculations are made. 

# Website
https://mysterious-coast-89997.herokuapp.com/

# Built with:
1. JavaScript
2. Jquery 
3. Express
4. Node.js
5. Bootstrap

# Setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Steps to Get the Development Environment Running
1. Register for an account here: https://developers.giphy.com/docs/#api-keys. Clicke Create an app to get your API Key. 
2. Download this project.
3. open in editor (ex. VS code)
4. open a terminal window (control ~)
5. npm install
6. npm start

# Steps to Deploy on Heroku

## Heroku Prerequisite (one time)
Sign up for an account at https://signup.heroku.com/
You may have to give them a credit card, but you shouldn't need to pay for anything
Install Heroku CLI by typing `brew install heroku` in Terminal
Authenticate by typing heroku login in Terminal
Note: Your project also needs to have a git repository.

## Heroku Setup

1. In terminal, navigate to the project folder and type `heroku create`
2. Login in if prompted
3. Type `git remote -v` to ensure it added successfully
4. Make sure your PORT is configured correctly as: `const PORT = process.env.PORT || 5000;`
5. Next, commit your changes and push them to Heroku:
    a. `git add .`
    b. `git commit -m "MESSAGE"`
    c. `git push heroku master`
6. Type heroku open as a shortcut to open your website in a browser.

Note: You'll need to commit and push each time you make a change that you want to deploy to Heroku. 



