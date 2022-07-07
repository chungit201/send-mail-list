import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  access_token: "",
  email: "",
  expire_time: 0,
  in_circle: false,
  is_fighter: false,
  is_free_user: false,
  user_id: 0,
  username: "",
  wallet_address: ""
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountData: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const {setAccountData} = counterSlice.actions

export default counterSlice.reducer
