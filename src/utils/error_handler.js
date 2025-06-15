export const error_handler = (err, _req, res, _next) => {
    switch (err.name) {
        case "UnauthorizedError":
            res.status(401).send("用户身份认证失败");
            break;
        default:
            res.status(500).send("服务器错误");
    }
};
