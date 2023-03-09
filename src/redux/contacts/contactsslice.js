import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const myContactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [addContacts.pending]: handlePending,
    [deleteContacts.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContacts.rejected]: handleRejected,
    [deleteContacts.rejected]: handleRejected,

    [addContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },

    [deleteContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(contact => contact.id !== action.payload.id);
    },
  },
});

export const contactsReducer = myContactsSlice.reducer;
