// src/features/register/registerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

interface RegisterState {
  loading: boolean;
  error: string | null | unknown;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  any, // Return type of the thunk
  RegisterUser, // Argument type for the thunk
  { rejectValue: string } // Configuration object type for the thunk
>(
  'register/register',
  async (userData: RegisterUser) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      return await response.json();
    } catch (error) {
      console.log('Failed to register user', error);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        // Optionally, handle success actions if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Optionally, handle failure actions if needed
      });
  },
});

export default registerSlice.reducer;