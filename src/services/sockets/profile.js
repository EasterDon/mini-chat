var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from "#models/sockets/index.js";
export const get_friens_profile = (friend_id) => __awaiter(void 0, void 0, void 0, function* () { });
/**
 * 根据用户ID获取该用户所有好友的基础信息
 * @param user_id 用户ID
 */
export const get_friends_profile = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield model.get_friends_profile(user_id);
    return friends;
});
