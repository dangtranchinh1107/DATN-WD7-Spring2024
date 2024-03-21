import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { caluclateOrderCost } from "../helpers/helpers";
=======
import { caluclateOrderCost } from "../../helpers/helpers";
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  return (
    <>
<<<<<<< HEAD
      <MetaData title={"Confrim Order Info"} />
      <div className="row d-flex justify-content-between text-left">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h1 className="mb-3 text-xl">
            <b>Shipping Info</b>
          </h1>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
=======
      <MetaData title={"Xác nhận thông tin đặt hàng"} />
      <div className="row d-flex justify-content-between text-left">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h1 className="mb-3 text-xl">
            <b>Thông tin vận chuyển</b>
          </h1>
          <p>
            <b>Tên:</b> {user?.name}
          </p>
          <p>
            <b>Số điện thoại:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Địa chỉ:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            {shippingInfo.zipCode}, {shippingInfo.country}
          </p>

          <hr />
<<<<<<< HEAD
          <h4 className="mt-4">Your Cart Items:</h4>
=======
          <h4 className="mt-4">Các sản phẩm trong giỏ hàng của bạn:</h4>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          {cartItems?.map((item) => (
            <>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item?.image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item?.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item?.quantity} x ${item?.price} ={" "}
                      <b>${(item?.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4 className="text-lg">
<<<<<<< HEAD
              <b>Order Summary</b>
            </h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>
=======
              <b>Tổng quan đơn hàng</b>
            </h4>
            <hr />
            <p>
              Tổng tiền sản phẩm:{" "}
              <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Phí vận chuyển:{" "}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>
            {/* <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p> */}
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4

            <hr />

            <p>
<<<<<<< HEAD
              Total: <span className="order-summary-values">${totalPrice}</span>
=======
              Tổng tiền thanh toán:{" "}
              <span className="order-summary-values">${totalPrice}</span>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            </p>

            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
<<<<<<< HEAD
              Proceed to Payment
=======
              Tiến hành thanh toán
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
