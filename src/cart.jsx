const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  return (
    <div>
      <h2>ราคารวม: {calculateTotal()} บาท</h2>
    </div>
  );
  