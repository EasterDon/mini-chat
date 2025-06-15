var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "./db.js";
export const create_new_user = (user_value) => __awaiter(void 0, void 0, void 0, function* () {
    const { avatar = "http://127.0.0.1:3001/images/avatar/index.png", username, password, nickname, } = user_value;
    const [result] = yield pool.execute("INSERT INTO user (avatar, username, password, nickname) VALUES (?, ?, ?, ?)", [avatar, username, password, nickname]);
    if (result.affectedRows !== 1) {
        throw new Error("用户注册失败：数据库未写入数据");
    }
});
export const get_user_by_username = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const [query_res] = yield pool.query(`select * from user where username=?`, [username]);
    const profile = query_res[0];
    if (!profile) {
        throw new Error("没有该用户，请先注册");
    }
    return profile;
});
export const update_user_online_status = (online, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query("UPDATE user SET online = ? WHERE id = ?", [
        online,
        user_id,
    ]);
});
export const update_user_online_state = (id, username, state) => __awaiter(void 0, void 0, void 0, function* () {
    const [query_res] = yield pool.execute("update user set online=? where id=? and username=?", [state, id, username]);
    if (query_res.affectedRows === 0) {
        throw new Error("登出失败");
    }
});
