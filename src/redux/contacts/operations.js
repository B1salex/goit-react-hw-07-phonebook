import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://63eb463bbfdd4299674444fc.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  // Используем символ подчеркивания как имя первого параметра,
  // потому что в этой операции он нам не нужен
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      // При успешном запросе возвращаем промис с данными
      return response.data;
    } catch (e) {
      // При ошибке запроса возвращаем промис
      // который будет отклонен с текстом ошибки
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const addContacts = createAsyncThunk(
  'contacts/addContacts',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { id, name, number });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
    'contacts/deleteContacts',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
     }
   }
);