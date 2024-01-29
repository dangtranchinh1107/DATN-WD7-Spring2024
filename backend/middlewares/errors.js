import ErrorHandler from "../utils/errorHandler";

export default (err, req, res, next) => {
    const error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };


    //Xử lý lỗi khóa trùng lặp Mongoose
    if (err.code === 1000) {
        const message = `Duplicate ${Option.keys(err.keyValue)} entered.`;
        error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
        message: error.message,
    });
};