import { configureStore } from '@reduxjs/toolkit';
import counterSlice from "./userSlice";


const store = configureStore({
  reducer: {
    user:counterSlice
  },
});


export default store;
