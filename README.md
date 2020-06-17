# ToDoList
An application which allows users to register and to create a list of tasks representing their "to do list".

## Existing features
* Display all tasks that the user has;
* Allow the user to mark the task as completed;
* Allow the user to delete a task or all of them;
* Display a custom message if the user doesn't have any
todo tasks;
* Allow the user to order the tasks by date-time created in ascending or descending order.

## Planned features
* Allow the user to favourite items so that they are pinned to the top;
* Allow the user to colour code items.

## Technology stack
* Node Express
* Handlebars and CSS
* MongoDB
* Insomnia

## Installation 
* Clone the project locally
* cd into the project folder
* npm init -y
* npm i express express-handlebars node-fetch dotenv mongoose --save
* Create a .env file in the project folder and add your MongoDB connection details as such: 
databaseURL=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
* Run the app using one of the following commands: nodemon / node index.js