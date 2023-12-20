import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting.js";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quatity;
  }, 0);
  function handleCloseCart(){
    userProgressCtx.hideCart();
  }
  function handleShowCheckout(){
    userProgressCtx.showCheckout();
  }
  function handleAddItem(item){
    cartCtx.addItem(item);
  }
  function handleRemoveItem(id){
    cartCtx.removeItem(id);
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress==='cart'}>
      <h2>Your meals</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} ({item.quatity})
            </p>
            <div className="cart-item-actions">
              <button onClick={()=>handleAddItem(item)}>+</button>
              <p>{currencyFormatter.format(item.price)}</p>
              <button onClick={()=>handleRemoveItem(item.id)}>-</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>Close</Button>
        <Button onClick={handleCloseCart}>Check out</Button>
      </p>
    </Modal>
  );
}
