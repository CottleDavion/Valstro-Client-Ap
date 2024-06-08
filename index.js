"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_service_1 = require("./src/message-service");
console.log("hello world");
var messageService = new message_service_1.MessageService();
messageService.startEventListening();
