import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  email: "",
  password: ""
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
