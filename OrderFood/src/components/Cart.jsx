import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting.js";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quatity;
  }, 0);
  function handlePressESC(){
    userProgressCtx.hideCart();
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart"?handlePressESC:null}>
      <h2>Your meals</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={userProgressCtx.hideCart} textOnly>
          Close
        </Button>
        {cartTotal > 0 && (
          <Button onClick={userProgressCtx.showCheckout}>Check out</Button>
        )}
      </p>
    </Modal>
  );
}
