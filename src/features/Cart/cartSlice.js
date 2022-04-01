const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {

    addToCart(state, action) {
      // newItem = { id, product, quantity }
      const newItem = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === newItem.id);

      if (index >= 0) {
        // increase quantity
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        // add to cart
        state.cartItems.push(newItem);
      }
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      // check if product is available in cart
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },

    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
    },

    resetCart(state){
        state.cartItems = []
    }
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart, resetCart } = actions; // named export
export default reducer; // default export
