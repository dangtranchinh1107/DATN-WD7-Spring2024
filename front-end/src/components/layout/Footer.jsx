import React from "react";
import "../../assets/css/home.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer bg-danger ">
        <div>
          <div className="title2">
            <img className="logo" src="src/images/logo.png" alt="" />
          </div>
          <div>Subscribe</div>
          <div>Nhận 10% giảm giá cho đơn hàng đầu tiên của bạn</div>
          <div className="email2">
            <input
              className="email"
              type="email"
              placeholder="Nhập email của bạn"
            />
            <i className="bi bi-send"></i>
          </div>
        </div>
        <div>
          <div className="title2">Liên hệ</div>
          <div>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</div>
          <div>techlap@gmail.com</div>
          <div>0789257816</div>
        </div>
        <div>
          <div className="title2">Tài khoản</div>
          <div>Tài khoản của tôi</div>
          <div>Đăng nhập / Đăng ký</div>
          <div>Giỏ hàng</div>
          <div>Danh sách yêu thích</div>
          <div>Cửa hàng</div>
        </div>
        <div>
          <div className="title2">Quick Link</div>
          <div>Privacy Policy</div>
          <div>Terms Of Use</div>
          <div>FAQ</div>
          <div>Contact</div>
        </div>
        <div>
          <div className="title2">Download App</div>
          <div>Save $3 with App New User Only</div>
          <div>
            <img src="src/images/Qrcode 1.png" alt="" />
            <div>
              <img src="src/images/GooglePlay.png" alt="" />
              <img src="src/images/download-appstore.png" alt="" />
            </div>
          </div>
          <div>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-linkedin"></i>
          </div>
        </div>
      </div>
      <div className="copy bg-danger ">
        <i className="bi bi-c-circle "></i>Copyright Rimel 2024. All right
        reserved
      </div>
    </footer>
  );
};

export default Footer;
