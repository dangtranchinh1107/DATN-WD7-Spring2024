import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from "crypto"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter your name'],
        maxLength: [50, 'k được vượt quá 50 ký tự'],
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
        minLength: [6, 'password phải từ 6 ký tự trở lên'],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, { timestamps: true })



//mã hóa mật khẩu trước khi lưu người dùng
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcryptjs.hash(this.password, 10)
})

// Trả lại mã thông báo JWT
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


//ss mk user
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}



//Tạo mã thông báo đặt lại mật khẩu
userSchema.methods.getResetPasswordToken = function () {
    //Tạo mã thông báo
    const resetToken = crypto.randomBytes(20).toString('hex')
    //đặt lại mã thông báo mật khẩu
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest('hex')
    //Đặt thời gian hết hạn mã thông báo
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken;

}
export default mongoose.model('User', userSchema)



