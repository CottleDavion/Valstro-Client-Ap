import { MessageService } from "./message-service";

var messageService = new MessageService();
messageService.startEventListening();

setTimeout(() => {
  if(messageService.shouldClose()){
    console.log("Failed to Connect to the server during startup, please check network or server status");
    process.exit();
  }
}, 1000);

console.log("Welcome to the Star Wars character look up.")
console.log("Enter a name to find the related movies.")
console.log("(we will match on partial names)")

var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('\nSearch: ');
rl.prompt();

messageService.waitForMessages(() => rl.prompt());

messageService.registerDisconnect(() => {
  console.log("There was a connection error, please check the server or network connection")
  rl.close()
})

rl.on('line', function(line: any) {
    messageService.search(line);

}).on('close', function() {
    console.log('Good Bye!');
    process.exit(0);
});
