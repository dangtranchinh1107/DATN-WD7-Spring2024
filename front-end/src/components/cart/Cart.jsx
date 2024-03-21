import React from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
=======
import { Link, useNavigate } from "react-router-dom";

>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increseQty = (item, quantity) => {
    const newQty = quantity + 1;
    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };
  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <>
      <MetaData title={"Giỏ hàng của bạn"} />
      {cartItems?.length === 0 ? (
<<<<<<< HEAD
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems?.length} items</b>
=======
        <h2 className="mt-5">Bạn chưa có sản phẩm nào trong giỏ hàng!</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Giỏ hàng của bạn : <b>{cartItems?.length} sản phẩm</b>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
          </h2>
          <div className="flex justify-between w-full gap-[120px] ">
            <div className="col-12 col-lg-8">
              {cartItems?.map((item) => (
                <>
                  <hr />
                  <div className="cart-item" data-key="product1">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item?.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item?.product}`}>
                          {" "}
                          {item?.name}{" "}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item?.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreseQty(item, item.quantity)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item?.quantity}
                            readonly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() => increseQty(item, item.quantity)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item?.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>

            <div className="w-1/2 flex justify-end">
              <div className="px-4 py-8 rounded border border-gray-400 w-full max-w-[470px]">
<<<<<<< HEAD
                <h2 className="text-xl font-normal mb-6">Cart Total</h2>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-b-gray-400">
                  <p className="text-base">Số lượng:</p>
                  <p className="text-base">
                    {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
=======
                <h2 className="text-xl font-normal mb-6">Tổng số sản phẩm</h2>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-b-gray-400">
                  <p className="text-base">
                    Số lượng:{""}
                    <span className="font-bold text-base">
                      {cartItems?.reduce(
                        (acc, item) => acc + item?.quantity,
                        0
                      )}{" "}
                    </span>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
                  </p>
                </div>

                <div className="flex justify-between items-center mb-4 pb-4">
<<<<<<< HEAD
                  <p className="text-base">Total:</p>
                  <p className="text-base">
                    $
                    {cartItems?.reduce(
                      (acc, item) => acc + item?.quantity * item.price,
                      0
                    )}
=======
                  <p className="text-base">
                    Tổng cộng:{""}
                    <span className="text-base font-bold">
                      $
                      {cartItems
                        ?.reduce(
                          (acc, item) => acc + item?.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
                  </p>
                </div>

                <button
                  id="checkout_btn"
                  className="btn bg-danger text-white w-100 font-medium text-base py-4 px-12 rounded w-fit mx-auto"
<<<<<<< HEAD
                   onClick={checkoutHandler}
                >
                  Check out
=======
                  onClick={checkoutHandler}
                >
                  Thanh toán
>>>>>>> 70dc9caa369907d560f06ac980304342816a8cb4
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
