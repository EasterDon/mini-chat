var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Server } from "socket.io";
import * as events from "./events/index.js";
export const use_ws_mini_chat = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // 允许所有域名访问
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        socket.on("disconnect", () => {
            console.log(`用户${socket.id}断开`);
        });
        socket.on("join-room", (msg, akt) => events.join_room(socket, msg, akt));
        socket.on("chat-message", (msg, akt) => events.chat(socket, msg, akt));
        socket.on("get-friends-profile", (msg, akt) => __awaiter(void 0, void 0, void 0, function* () { return events.get_friends_profile(socket, msg, akt); }));
        socket.on("upload-file", () => {
            console.log("文件上传");
        });
    });
    return io;
};
