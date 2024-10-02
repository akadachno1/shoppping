import React, { useState } from 'react';
import ProductList from './ProductList';

function App() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const shippingFee = 100;

  const products = [
    { id: 1, name: 'แมวเทาลายน่ารักๆ', price: 5000 , imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0Yrx17n1drkMYpW55ZQkkXegIynoji4hJA&s' },
    { id: 2, name: 'แมวส้มจอมซน', price: 7500, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZPRo5ILl4Tew10m2HkWjfk8vgdhNwdxzvbw&s' },
    { id: 3, name: 'แมวลายสลิด นอนได้ทั้งวัน', price: 7900, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg' },
    { id: 4, name: 'แมวส้ม เจ้าบ้าน รุ่นลิมิเต็ด', price: 4790, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2TefYIQELg5J2TdRT-PUwUvojjYAyvKYfA&s' },
    { id: 5, name: 'แมวจ้องตา เครื่องรางนำโชค', price: 1390, imageUrl: 'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg' },
    { id: 6, name: 'เช็ทแมวคู่ เพิ่มโชคให้แก่บ้าน', price: 15000, imageUrl: 'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg' },
    { id: 7, name: 'แมวเทาๆ น่ารักๆ ซื้อวันนี้ แถมฟรีหมอนลายแมว', price: 1390, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxytkWwH_1efcv_Xe-cfKRbxD-JObOI9oV7g&s' },
  ];

  const couponCodes = {
    'DISCOUNT10': 1000,
    'DISCOUNT20': 2000,
    // เพิ่มคูปองเพิ่มเติมที่นี่
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    ));
  };

  const applyCoupon = () => {
    if (couponCodes[coupon]) {
      setDiscount(couponCodes[coupon]);
    } else {
      setDiscount(0);
      alert('คูปองไม่ถูกต้อง');
    }
    setCoupon('');
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalAfterDiscount = subtotal - (subtotal * discount / 100);
    return totalAfterDiscount + (cart.length > 0 ? shippingFee : 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('กรุณาเพิ่มสินค้าในตะกร้าก่อนทำการชำระเงิน'); // Alert if cart is empty
    } else {
      // Proceed to payment logic here
      alert(`Total amount to pay: ${calculateTotal()} บาท`); // Example action
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold my-8 text-center">cat cat Shop</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Sidebar: Shopping Cart */}
          <div className="col-span-1 bg-white p-4 shadow-lg rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">สินค้า</h2>
            </div>

            {cart.length > 0 && (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="border-b py-2">
                      <div className="flex justify-between items-center">
                        <span>{item.name} - {item.price} บาท x {item.quantity}</span>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="bg-red-500 text-white px-2 py-1 rounded-md">-</button>
                          <button onClick={() => updateQuantity(item.id, 1)} className="bg-green-500 text-white px-2 py-1 rounded-md">+</button>
                          <button onClick={() => removeFromCart(item.id)} className="bg-gray-500 text-white px-2 py-1 rounded-md">ลบ</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Coupon Section */}
                <div className="mt-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ใส่คูปอง"
                    className="border p-2 rounded-md w-full"
                  />
                  <button onClick={applyCoupon} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    ใช้คูปอง
                  </button>
                </div>

                {/* Shipping Fee and Total Price */}
                <div className="mt-4">
                  <h2 className="text-xl">ค่าขนส่ง: {shippingFee} บาท</h2>
                  <h2 className="text-xl font-bold mt-4">ราคารวม: {calculateTotal()} บาท</h2>
                  <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    ชำระเงิน
                  </button>
                </div>
              </>
            )}
            <h2>รายการสินค้า</h2>
          </div>

          {/* Product List */}
          <div className="col-span-2">
            <ProductList products={products} addToCart={addToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;