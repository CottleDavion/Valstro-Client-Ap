# Valstro-Client-App

This application was created utilizing node.js and the socket.io-client to communicate with the server

There are two parts to the application, the app.js entry point and the message-service that handles communication to the server.

### Message Service
The message service initializes the socket.io connection and sets up the messaging events for search and disconnection.  It also provides two callback functions that are utilized by app.js

### App.js
The app.js file starts the message service and then proceeds to explain to the user the application use and then prompts the user for their search.  A realine interface is setup to interact with the use.  Any inputs are funneled back to the message service as a query.  `waitForMessages` and `registerDisconnect` are the two call back functions registered within th message service that enable continues messaging and listening for disconnections.

### Waiting For Messages
One of the harder problems to solve in this solution was waiting for all the events to be one before enabling the user to search again.  I opted to listen for any messages to return and then set a timeout past the random 1000ms interval that messages could continue to be published.  Any time a message came in I would restart that timeout until no more messages were setting it.  I utilized an array to add active messages into and then pop one message at a time after the timeout had elapsed.  This also enabled to block secondary queries from publishing while one was still active.