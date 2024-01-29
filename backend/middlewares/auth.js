import catchAsyncErrors from "./catchAsyncErrors";

// kiểm tra xem người dùng có được xác thực hay không

export const isAuthenticatedUser = catchAsyncErrors(async (res, req, next) => {
    const { token } = req.cookies;

    console.log(token)
})