import React from 'react';

const ProductList = ({ products, addToCart }) => {
  if (!products || products.length === 0) {
    return <p>ไม่มีสินค้าพร้อมจำหน่าย</p>;
  }

  return (
    <div className="card-container"> {/* ใช้ class สำหรับการจัดการ CSS */}
      {products.map((product) => (
        <div key={product.id} className="card"> 
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="object-cover h-24 w-24 rounded-md"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-xl">{product.price} บาท</p>
          <button 
            onClick={() => addToCart(product)} 
            className="bg-blue-500 text-white px-1 py-1 rounded-md"
          >
            เพิ่มในตะกร้า
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
