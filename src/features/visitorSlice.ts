import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './middleware/api-creators'

const initialState = {
  list: [],
  isLoading: false,
  metadata: {
    totalUsers: 0,
    totalPages: 0,
    total: 0,
  },

}

export const visitorSlice = createSlice({
  name: 'visitor',
  initialState,
  reducers: {
    UserListSuccess: (state, action:any) => {
      state.isLoading = false
      state.list = action.payload.data || []
      state.metadata.totalPages = action?.payload?.meta?.last_page
      state.metadata.total = action?.payload?.meta?.total
      state.metadata.totalUsers = action?.total

      
    },
    UserListPending: (state, action) => {
      state.isLoading = true
    },
    UserListFailed: (state, action) => {
      state.isLoading = false
    }
  },
})

export const {
  UserListSuccess,
  UserListPending,
  UserListFailed,
} = visitorSlice.actions

export default visitorSlice.reducer

export const fetchVisitors= (data: any,page:any) =>
  apiCallBegan({
    url: `/admin/visitors?status=${data.status}&search_key=${data.search_key}&page=${page}&designation=${data.designation}&start_date=${data.start_date}&end_date=${data.end_date}`,
    method: 'GET',
    data,
    onStart: UserListPending.type,
    onSuccess: UserListSuccess.type,
    onError: UserListFailed.type,
  })

