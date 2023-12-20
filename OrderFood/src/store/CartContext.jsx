import { createContext, useReducer } from "react";
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updateItem = {
        ...existingItem,
        quatity: existingItem.quatity + 1,
      };
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems.push({ ...action.item, quatity: 1 });
    }
    return {
      ...state,
      items: updateItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updateItems = [...state.items];
    if (state.items[existingCartItemIndex].quatity === 1) {
      updateItems.splice(existingCartItemIndex,1);
    } else {
      const updateItem = {
        ...existingCartItem,
        quatity: existingCartItem.quatity - 1,
      };
      updateItems[existingCartItemIndex] = updateItem;
    }
    return {
      ...state,
      items: updateItems,
    };
  }
}
export function CartContextProvider({ children }) {
  const [cart, dispactchCartAction] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    dispactchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  }
  
  function removeItem(id) {
    dispactchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };
  console.log(cartContext.items);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
