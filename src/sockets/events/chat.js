var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { friend_message, group_message } from "#services/sockets/index.js";
export const chat = (socket, msg, akt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message_handler = null;
        switch (msg.type) {
            case "friend":
                message_handler = friend_message;
                break;
            case "group":
                message_handler = group_message;
                break;
            default:
                throw new Error("消息类型错误！");
        }
        const { status, timestamp } = yield message_handler(socket, msg);
        akt({ status, timestamp });
    }
    catch (error) {
        akt({});
    }
});
