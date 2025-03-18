import React from 'react'

const FooterClinet = () => {
  return (
    
          <footer>
      <div className="footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-column">
          <h3>Về Chúng Tôi</h3>
          <p>
            Chuyên cung cấp quần áo thời trang chất lượng, mẫu mã đa dạng với giá tốt nhất.
          </p>
        </div>

        {/* Cột 2: Hỗ trợ khách hàng */}
        <div className="footer-column">
          <h3>Hỗ Trợ Khách Hàng</h3>
          <ul>
            <li>
              <a href="#">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="#">Chính sách bảo hành</a>
            </li>
            <li>
              <a href="#">Chính sách vận chuyển</a>
            </li>
            <li>
              <a href="#">Hướng dẫn mua hàng</a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div className="footer-column">
          <h3>Liên Hệ</h3>
          <p>
            <i className="fa-solid fa-phone"></i> 0123 456 789
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> support@shop.com
          </p>
          <p>
            <i className="fa-solid fa-map-marker-alt"></i> 123 Đường ABC, TP.HCM
          </p>
        </div>

        {/* Cột 4: Mạng xã hội */}
        <div className="footer-column">
          <h3>Theo Dõi Chúng Tôi</h3>
          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <p className="footer-bottom">&copy; 2025 Shop Quần Áo - Bản quyền thuộc về chúng tôi</p>
    </footer>
    
  )
}

export default FooterClinet
