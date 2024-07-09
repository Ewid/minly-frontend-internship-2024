import { useState } from "react";

export default function Home() {
  const products = [
    { name: "Apple", unitPrice: 2 },
    { name: "Orange", unitPrice: 3 },
    { name: "Banana", unitPrice: 1.5 },
    { name: "Grapes", unitPrice: 4 },
    { name: "Ewida", unitPrice: 10000000}
  ];

  const [quantities, setQuantities] = useState(products.map(() => 0));

  function increment(index) {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  }

  function decrement(index) {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  }

  function calculateTotalPrice() {
    return products.reduce((total, product, index) => {
      return total + product.unitPrice * quantities[index];
    }, 0);
  }

  return (
    <>
      <h1>Shopping Cart</h1>
      {products.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          unitPrice={product.unitPrice}
          quantity={quantities[index]}
          increment={() => increment(index)}
          decrement={() => decrement(index)}
        />
      ))}
      <h2>Total Price: ${calculateTotalPrice()}</h2>
    </>
  );

  function Product({ name, unitPrice, quantity, increment, decrement }) {
    return (
      <div>
        <h2>{name} Price: ${unitPrice}</h2>
        <button onClick={increment}>
          Add {name} (Quantity: {quantity})
        </button>
        <button onClick={decrement}>
          Remove {name} (Quantity: {quantity})
        </button>
        <p>Total Price for {name}s: ${unitPrice * quantity}</p>
      </div>
    );
  }
}
