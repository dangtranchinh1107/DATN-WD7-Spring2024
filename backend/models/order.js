import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    CheckOut: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Cart: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: [true, "Vui lòng chọn phương thức thanh toán"],
      enum: {
        values: ["COD", "Card"],
        message: "Vui lòng chọn: COD or Card",
      },
    },
    Bill: [
      {
        id: String,
        status: String,
      },
    ],
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["Đang xử lý", "Được vận chuyển", "Đã giao hàng"],
        message: "Vui lòng chọn chính xác tình trang đặt hàng!",
      },

      default: "Đang xử lý",
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
