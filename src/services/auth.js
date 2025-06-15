var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from "#models/auth.js";
import { check_sign_up_value, check_sign_in_value } from "#utils/check.js";
import { create_token } from "#utils/jwt.js";
/**
 * 用户注册
 */
export const sign_up = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sign_up_value = req.body;
        check_sign_up_value(sign_up_value);
        yield model.create_new_user(sign_up_value);
        res.status(201);
    }
    catch (err) {
        next(err);
    }
});
/**
 * 用户登录
 */
export const sign_in = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // 验证用户名密码是否符合格式
        check_sign_in_value(username, password);
        // 查询数据库是否存在该用户
        const profile = yield model.get_user_by_username(username);
        // 密码验证
        if (profile.password !== password) {
            throw new Error("密码错误，请重试");
        }
        // 将用户在线状态改为在线
        yield model.update_user_online_status(true, profile.id);
        profile.online = 1;
        // 将除密码外的数据返回给客户端
        delete profile.password;
        const token = create_token(profile.id, profile.username);
        res.status(200).json({
            profile,
            token,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * 用户登出
 */
export const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, username } = req.body;
        const state = false;
        // 更新用户在线状态
        yield model.update_user_online_state(id, username, state);
        res.status(201);
    }
    catch (err) {
        next(err);
    }
});
