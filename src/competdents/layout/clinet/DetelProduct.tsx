import React from 'react'

const DetelProduct = () => {
  return (
    <div>
    
    <div className="product-detail">
                <img src="https://bedental.vn/wp-content/uploads/2022/11/ho-1024x1024.jpg" alt="Sản phẩm" />
                <div className="product-info">
                    <h2>Tên Sản Phẩm</h2>
                    <p>Mô tả ngắn về sản phẩm. Đây là sản phẩm chất lượng cao, phù hợp với mọi nhu cầu của bạn.</p>
                    <p className="price">Giá: 500,000 VNĐ</p>
                    <div className="buttons">
                        <button className="add-to-cart"><i className="fa-solid fa-shopping-cart"></i>{'\u00A0'}Add To Cart</button>
                        <button className="buy-now"><i className="bi bi-lightning-fill"></i>{'\u00A0'} Buy Now</button>
                    </div>
                </div>
            </div>
    
    </div>
  )
}

export default DetelProduct
