import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IUser {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

interface IUserState {
  users: IUser[]
  currentUser: number | undefined
}

const initialState: IUserState = {
  users: [],
  currentUser: undefined,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
    },

    setCurrentUser: (state, action: PayloadAction<number>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setUsers, setCurrentUser } = globalSlice.actions

export const selectUsers = (state: { users: IUserState }) => state.users.users

export const selectCurrentUser = (state: { users: IUserState }) =>
  state.users.currentUser

export default globalSlice.reducer
