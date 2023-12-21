import { currencyFormatter } from "../util/formatting";
export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {item.name} ({item.quatity})
      </p>
      <div className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <p>{currencyFormatter.format(item.price)}</p>
        <button onClick={onIncrease}>+</button>
      </div>
    </li>
  );
}
