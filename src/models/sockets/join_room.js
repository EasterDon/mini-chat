var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "#models/db.js";
export const get_user_rooms = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rooms] = yield pool.query("SELECT * FROM friendship WHERE user_id_1 = ? OR user_id_2 = ?", [user_id, user_id]);
    return rooms;
});
