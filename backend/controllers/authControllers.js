import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from '../models/user'
import ErrorHandler from "../utils/errorHandler";
import sendToken from "../utils/sendToken";


// dky user  => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    })


    sendToken(user, 201, res)
})

// dangnhap user  => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Phải điền email & password", 400))
    }

    //tìm kiếm user trong database
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 401))
    }


    //ktra mk
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 401))
    }

    sendToken(user, 200, res)

})  