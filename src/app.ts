import { MessageService } from "./message-service";

var messageService = new MessageService();
messageService.startEventListening();

setTimeout(() => {
  if(messageService.isConnected()){
    console.error("\nFailed to Connect to the server during startup, please check network or server status");
    process.exit();
  }
}, 1000);

console.log("Welcome to the Star Wars character look up.")
console.log("Enter a name to find the related movies.")
console.log("(we will match on partial names)")

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

messageService.waitForMessages(() => rl.prompt());
messageService.registerDisconnect(() => {
  console.error("There was a connection error, please check the server or network connection")
  rl.close()
})

rl.setPrompt('\nSearch: ');
rl.prompt();
rl.on('line', function(line: any) {
    messageService.search(line);

}).on('close', function() {
    console.warn('Good Bye!');
    process.exit(0);
});
