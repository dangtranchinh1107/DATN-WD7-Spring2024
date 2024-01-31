

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js"
import Product from "../models/Product.js"
import ErrorHandler from "../utils/errorHandler.js";

//Tạo mới Order => /api/v1/orders/new

export const newOrder = catchAsyncErrors(async (req,res , next)=> {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
    } = req.body;

    const orders = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user._id,
    });
    res.status(200).json({
        orders,
    });
});

//Get orders Details => /api/v1/orders/:id

export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order) {
        return next (new ErrorHandler("No Order found with this ID", 404));
    }
    res.status(200).json({
        order,
    });
});
//Get current user orders => /api/v1/me/orders

export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({user: req.user._id});

    if(!order) {
        return next (new ErrorHandler("No Order found with this ID", 404));
    }
    res.status(200).json({
        order,
    });
});
//Get all orders - ADMIN => /api/v1/admin
export const allOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find();

    res.status(200).json({
        order,
    });
});

//Update orders - ADMIN => /api/v1/admin/orders/:id
export const updateOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next (new ErrorHandler("No Order found with this ID", 404));
    }
    if(order?.orderStatus === "Delivered") {
        return next (new ErrorHandler("You have already delivered this order", 400));
    }
    //update product stock
    order?.orderItems?.foreach(async (item) => {
        const product = await Product.findById(item?.product?.toString());
        if(!product){
            return next(new ErrorHandler("No Product found with this ID", 404));
        }
        product.stock = product.stock - item.quantity;
        await product.save({validateBeforeSave: false});
    });
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(200).json({
        success: true,
    });
});