# Client

The client project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4.

**Running the client:**
In client's root folder, run **npm i** to install dependencies. Then run **ng serve** to run the project.
---Client app will use port **4200** by default.
**Note:** Api configurations are under **/src/environments/environment.ts**. These configurations can be changed regarding server's configuration.

---
# Server

The server app was built using express, socket.io with javascript.

**Running the server:**
In server's root folder, run **npm i** to install dependencies. Then run **node index.js** to run the server.
**Note:** Cors configuration is located under **/server/core/config.json**. This URL must be changed if the client app uses different port

---
## Purpose of the Application

To communicate between client and server via socket.io and performing actions.

---
## How to Use the App
After running the client and the server:

User can sign in to the client app using default user credentials:
**user names**: admin, firat, dido
**password**: 123

##### **Note:** 
- Users are located under **/server/core/data/users.json**. Users can be modified here. (Passwords are encrypted using MD5)-
- User cannot interact with the widget more than once unless server restarts or user relogins. 
