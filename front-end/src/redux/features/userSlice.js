import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // Thêm các trường khác của state auth nếu cần thiết
  },
  reducers: {
    logoutUser: (state) => {
      // Đặt user về null khi người dùng đăng xuất
      state.user = null;
      // Có thể thêm các bước khác để làm sạch state nếu cần thiết
    },
    // Thêm reducers khác nếu cần thiết
  },
});

// Export các hàm reducers và actions từ slice
export const { logoutUser } = authSlice.actions;

export default userSlice.reducer;

export const { setIsAuthenticated, setUser } = userSlice.actions;
