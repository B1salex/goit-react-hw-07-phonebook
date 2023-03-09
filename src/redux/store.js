import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsslice';
import { filtersReducer } from './contacts/filterSlice';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// check
