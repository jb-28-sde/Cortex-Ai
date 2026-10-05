import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import conversationReducer from "./conversationsSlice.js"
import messageReducer from "./messageSlice.js"

export const store = configureStore({
  reducer: {
    user:userReducer,
    conversation:conversationReducer,
    message:messageReducer
  },
})