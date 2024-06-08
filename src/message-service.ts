import { io } from "socket.io-client";
import { QueryResults } from "./result";
import { EventEmitter } from "stream";

export class MessageService {
  private socket = io("http://localhost:3000", {timeout: 1000});
  private connected = false;

  private activeMessages: any[] = []
  private messageReceived = new EventEmitter()
  private disconnectListener: any

  constructor() {
    this.socket.on("connect", () => {
      this.connected = true;
    });

    this.socket.on("disconnect", () => {
      this.connected = false
    });
  }

  public startEventListening() {
      this.socket.on("search", (...args: QueryResults[]) => {
        this.activeMessages.push(args);
        // this.messageReceived.emit("newMessage");
        console.log(`\n`)
        args.forEach(match => {
          if(match.error){
            console.log(match.error)
            return
          }

          console.log(`Name: ${match.name}`)
          console.log(`Films: ${match.films}`)
        });
      });
  }

  public search(value: string){
    this.socket.emit("search", {query: value})
  }
  
  public shouldClose(): boolean {
    return (this.connected == false)
  }

  public waitForMessages(callback: () => void) {
    this.socket.on("search", () => {
      setTimeout(() => {
        this.activeMessages.pop()
        if (this.activeMessages.length == 0){
          callback();
        }
      }, 1100)
    })
  }

  public registerDisconnect(callback: () => void) {
    this.socket.on('disconnect', callback)
  }
}
