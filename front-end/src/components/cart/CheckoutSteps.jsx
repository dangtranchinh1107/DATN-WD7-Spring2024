import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <>
      <div className="checkout-progress d-flex justify-content-center mt-5 ">
        {shipping ? (
          <Link to="/shipping" className="m-0">
            <div className="triangle2-active"></div>
<<<<<<< HEAD
            <div className="step active-step">Shipping</div>
=======
            <div className="step active-step">Vận chuyển </div>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" className="m-0">
            <div className="triangle2-incomplete"></div>
<<<<<<< HEAD
            <div className="step incomplete">Shipping</div>
=======
            <div className="step incomplete"> Vận chuyển</div>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            <div className="triangle-incomplete"></div>
          </Link>
        )}
        {confirmOrder ? (
          <Link to="/confirm_order" className="m-0">
            <div className="triangle2-active"></div>
<<<<<<< HEAD
            <div className="step active-step">Confirm Order</div>
=======
            <div className="step active-step">Xác nhận đơn hàng</div>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" className="m-0">
            <div className="triangle2-incomplete"></div>
<<<<<<< HEAD
            <div className="step incomplete">Confirm Order</div>
=======
            <div className="step incomplete">Xác nhận đơn hàng</div>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            <div className="triangle-incomplete"></div>
          </Link>
        )}
        {payment ? (
          <Link to="/payment_method" className="m-0">
            <div className="triangle2-active"></div>
<<<<<<< HEAD
            <div className="step active-step">Payment</div>
=======
            <div className="step active-step">Thanh toán</div>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="/payment_method" className="m-0">
            <div className="triangle2-incomplete"></div>
<<<<<<< HEAD
            <div className="step incomplete">Payment</div>
=======
            <div className="step incomplete">Thanh toán</div>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
            <div className="triangle-incomplete"></div>
          </Link>
        )}
      </div>
    </>
  );
};

export default CheckoutSteps;
