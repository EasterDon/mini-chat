var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const friend_message = (socket, msg) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = Date.now();
    let status = true;
    // 发送消息给目标房间
    socket.to(`friend-${msg.room}`).emit("get-message", Object.assign(Object.assign({}, msg), { timestamp }));
    return { status, timestamp };
});
export const group_message = (socket, msg) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = Date.now();
    let status = true;
    // 发送消息给目标房间
    socket.to(`group-${msg.room}`).emit("get-message", Object.assign(Object.assign({}, msg), { timestamp }));
    return { status, timestamp };
});
