"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
let allSockets = [];
wss.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", (message) => {
        // console.log(message);
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            const roomId = parsedMessage.payload.roomId.trim().toLowerCase();
            allSockets.push({
                socket,
                room: roomId,
            });
            console.log(`User joined room: ${roomId}`);
            /// for user join  and count
            const roomUserCount = allSockets.filter(u => u.room === roomId).length;
            const userJoinedMessage = JSON.stringify({
                type: "user-joined",
                payload: {
                    count: roomUserCount,
                    message: "A new user joined the room."
                }
            });
            allSockets.forEach((user) => {
                if (user.room === roomId) {
                    user.socket.send(userJoinedMessage);
                }
            });
        }
        if (parsedMessage.type === "chat") {
            const userEntry = allSockets.find((x) => x.socket === socket);
            if (!userEntry)
                return;
            const currentUserRoom = userEntry.room;
            console.log(`User sent message in room: ${currentUserRoom}`);
            // console.log("Message:", parsedMessage.payload.sender);
            // console.log("Message:", parsedMessage.payload.message);
            console.log({ sender: parsedMessage.payload.sender, message: parsedMessage.payload.message });
            allSockets.forEach((user) => {
                // if (user.room === currentUserRoom && user.socket !== socket) {
                //   user.socket.send(parsedMessage.payload.message);
                // }
                if (user.room === currentUserRoom) {
                    user.socket.send(JSON.stringify({
                        type: 'chat',
                        payload: {
                            sender: parsedMessage.payload.sender,
                            message: parsedMessage.payload.message
                        }
                    }));
                }
            });
        }
    });
    // socket.on("close", () => {
    //   allSockets = allSockets.filter((x) => x.socket !== socket);
    //   console.log("Client disconnected");
    // });
    socket.on("close", () => {
        const leavingUser = allSockets.find((x) => x.socket === socket);
        allSockets = allSockets.filter((x) => x.socket !== socket);
        if (leavingUser) {
            const roomUserCount = allSockets.filter(user => user.room === leavingUser.room).length;
            const userLeftMessage = JSON.stringify({
                type: "user-left",
                payload: {
                    count: roomUserCount,
                    message: "A user left the room."
                }
            });
            allSockets.forEach((user) => {
                if (user.room === leavingUser.room) {
                    user.socket.send(userLeftMessage);
                }
            });
        }
        console.log("Client disconnected");
    });
});
// import { WebSocketServer, WebSocket } from "ws";
// const wss = new WebSocketServer({ port: 8000});
// interface User{
//          socket: WebSocket;
//          room: string;
// }
// // let userCount =0;
// let allSockets: User[] =[];
// wss.on("connection", function connection(socket){
//           socket.on("message", (message) => {
//              const parsedMessage = JSON.parse(message as unknown as string);
//                if(parsedMessage.type == "join"){
//                    allSockets.push({
//                        socket,
//                        room: parsedMessage.payload.roomId
//                     })
//                     console.log("user joined")
//                }
//                  if(parsedMessage.type == "chat"){
//                      //@ts-ignore
//                      const currentUserRoom = allSockets.find((x)=>x.socket === socket).room;
//                      console.log("user chatted")
//                     //  console.log(currentUserRoom)
//                    for(let i=0; i<allSockets.length; i++){
//                          if(allSockets[i].room === currentUserRoom){
//                               // You can send the message to all users in the same room
//                               allSockets[i].socket.send(parsedMessage.payload.message);
//                          }
//                         }
//                         console.log(parsedMessage.payload.message)
//                     }
//         })
// })
