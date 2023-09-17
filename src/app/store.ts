import { configureStore } from '@reduxjs/toolkit';
import { ghibliApiSlice } from './slices/ghibli-api-slice';


export const store = configureStore({

  reducer: {
    [ghibliApiSlice.reducerPath]: ghibliApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ghibliApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;