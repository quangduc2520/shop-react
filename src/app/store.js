
import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
