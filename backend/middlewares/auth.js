import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";
import jwt from "jsonwebtoken"
import User from "../models/user"


// Kiểm tra xem người dùng có được xác thực hay không
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
})

// Ủy quyền vai trò người dùng
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role (${req.user.role}) is not allowed to access this resource`,
                    403
                )
            );
        }

        next();
    };
}