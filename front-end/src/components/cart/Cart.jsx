import React from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      dispatch(removeCartItem(id));
    }
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <>
      <MetaData title={"Giỏ hàng của bạn"} />
      {cartItems?.length === 0 ? (
        <div>
          <img
            className="w-50 d-flex"
            src="https://fptshop.com.vn/estore-images/empty-cart.png"
            alt=""
          ></img>
          <h2 className="text-center text-danger fw-bold">
            Chưa có sản phẩm nào trong giỏ hàng
          </h2>
          <div className="d-flex">
            <Link className="btn btn-warning text-white " to={"/"}>
              Mua ngay
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mt-5 fs-4">
            Giỏ hàng của bạn : <b>{cartItems?.length} sản phẩm</b>
          </h2>
          <div className="d-flex justify-between w-full gap-[120px] ">
            <div className="col-12 col-lg-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item.product}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          height="90"
                          width="115"
                        />
                      </td>
                      <td>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="stockCounter">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreseQty(item, item.quantity)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() => increseQty(item, item.quantity)}
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td>${item.price * item.quantity}</td>
                      <td>
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.product)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-1/2 flex justify-end ">
              <div className="px-4 py-8 rounded border border-gray-400 w-full max-w-[470px] p-5 pe-5 ps-5 shadow mb-5 bg-body-tertiary ">
                <h2 className="text-xl font-normal mb-6">Tổng thanh toán</h2>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-b-gray-400">
                  <p className="text-base">
                    Số lượng:{""}
                    <span className="font-bold text-base fw-bolder">
                      {cartItems?.reduce(
                        (acc, item) => acc + item?.quantity,
                        0
                      )}{" "}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between items-center mb-4 pb-4">
                  <p className="text-base ">
                    Tổng cộng:{""}
                    <span className="text-base font-bold fw-bolder">
                      $
                      {cartItems
                        ?.reduce(
                          (acc, item) => acc + item?.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </p>
                </div>

                <button
                  id="checkout_btn"
                  className="btn bg-danger text-white w-100 font-medium text-base py-4 px-12 rounded w-fit mx-auto"
                  onClick={checkoutHandler}
                >
                  Thanh toán
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
