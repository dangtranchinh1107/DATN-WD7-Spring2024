import React, { useEffect } from "react";
import "./invoice.css";
import { useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};
  console.log(data);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);
  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order?._id}.pdf`);
    });
  };
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={handleDownload}>
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img
                className="bg-black p-4"
                src="/images/logo.png"
                alt="Company Logo"
              />
            </div>
            <h1 className="pb-2">INVOICE # {order?._id}</h1>
            <div id="company" className="clearfix">
              <div>TechLap</div>
              <div>Hà Nội</div>
              <div>(84) 789257816</div>
              <div>
                <a href="mailto:techlap@gmail.com">techlap@gmail.com</a>
              </div>
            </div>
            <div id="project" className="text-start">
              <div>
                <span>Name</span> {user.name}
              </div>
              <div>
                <span>EMAIL</span> {user.email}
              </div>
              <div>
                <span>PHONE</span> {shippingInfo.phoneNo}
              </div>
              <div>
                <span>ADDRESS</span>
                {shippingInfo.address}, {shippingInfo.city},{""}
                {shippingInfo.zipCode}, {shippingInfo.country}
              </div>
              <div>
                <span>DATE</span>{" "}
                {new Date(order?.createdAt).toLocaleString("vn-VN")}
              </div>
              <div>
                <span>Status</span> {paymentInfo?.status}
              </div>
            </div>
          </header>
          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr>
                    <td className="service">{item?.product}</td>
                    <td className="desc">{item?.name}</td>
                    <td className="unit">${item?.price}</td>
                    <td className="qty">{item?.quantity}</td>
                    <td className="total">${item?.price * item?.quantity}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="4">
                    <b>TỔNG PHỤ</b>
                  </td>
                  <td className="total">${order?.itemsPrice}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>THUẾ 15%</b>
                  </td>
                  <td className="total">${order?.taxAmount}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>PHÍ VẬN CHUYỂN</b>
                  </td>
                  <td className="total">${order?.shippingAmount}</td>
                </tr>

                <tr>
                  <td colSpan="4" className="grand total">
                    <b>TỔNG CỘNG</b>
                  </td>
                  <td className="grand total">${order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>Lưu ý:</div>
              <div className="notice">
                Khoản phí tài chính 1,5% sẽ được tính trên số dư chưa thanh toán
                sau 30 ngày.
              </div>
            </div>
          </main>
          <footer className="bg-black p-5">
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
